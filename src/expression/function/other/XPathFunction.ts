import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Util from '../../../util/Util';
import SimpleDataTable from '../../../datatable/SimpleDataTable';
import FieldFormatFactory from '../../../datatable/FieldFormatFactory';
import TableFormat from '../../../datatable/TableFormat';
import FieldConstants from '../../../datatable/field/FieldConstants';
import DataTable from '../../../datatable/DataTable';

export default class XPathFunction extends AbstractFunction {
  public static FIELD_NODE_NAME = 'nodeName';
  public static FIELD_NODE_CONTENT = 'nodeContent';
  public static FIELD_NODE_CHILDREN = 'nodeChildren';

  constructor() {
    super(Functions.GROUP_OTHER, 'String xml, String query [, Boolean table]', 'Object', Cres.get().getString('fDescXPath'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(2, false, parameters);

    try {
      const toTable = parameters.length >= 3 ? Util.convertToBoolean(parameters[2], true, false) : false;

      const doc = new DOMParser().parseFromString(parameters[0], 'application/xml');
      const expr = new XPathEvaluator().createExpression(parameters[1].toString());
      let result;

      if (toTable) {
        result = expr.evaluate(doc, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
        return this.tableFromNodes(result);
      } else {
        result = expr.evaluate(doc, XPathResult.FIRST_ORDERED_NODE_TYPE);
        const element = result.singleNodeValue as Element;
        if (element) return element.outerHTML;
        return '';
      }
    } catch (e) {
      throw new Error(e.message);
    }
  }
  private buildNode(node: any, dataTable: DataTable, snapshotType: boolean) {
    if (node.nodeType == Node.ATTRIBUTE_NODE) {
      this.buildAttributeNode(node, dataTable);
    } else if (node.nodeType == Node.ELEMENT_NODE) {
      this.buildElementNode(node, dataTable);
    }
  }
  private tableFromNodes(nodes: any | null, snapshotType = true) {
    const format = this.formatFromNodes(nodes, snapshotType);
    const result = new SimpleDataTable(format);
    if (snapshotType) {
      for (let i = 0; i < nodes.snapshotLength; i++) {
        const node = nodes.snapshotItem(i);
        this.buildNode(node, result, snapshotType);
      }
    } else {
      const iterator = nodes[Symbol.iterator]();
      let element = iterator.next();
      while (!element.done) {
        this.buildNode(element.value, result, snapshotType);
        element = iterator.next();
      }
    }

    return result;
  }
  private createFormatAttribute(attributes: any, format: TableFormat) {
    for (let i = 0; i < attributes.length; i++) {
      const attribute = attributes.item(i);
      const attrField = FieldFormatFactory.createType(Util.descriptionToName(attribute.name), FieldConstants.STRING_FIELD);
      attrField.setNullable(true);

      if (!format.hasField(attrField.getName())) {
        format.addField(attrField);
      }
    }
  }
  private formatFromNodes(nodes: any | null, snapshotType: boolean) {
    const format = new TableFormat();
    format.addField(FieldFormatFactory.create('<' + XPathFunction.FIELD_NODE_NAME + '><S><D=' + Cres.get().getString('name') + '>'));
    format.addField(FieldFormatFactory.create('<' + XPathFunction.FIELD_NODE_CONTENT + '><S><F=N><D=' + Cres.get().getString('content') + '>'));
    format.addField(FieldFormatFactory.create('<' + XPathFunction.FIELD_NODE_CHILDREN + '><T><D=' + Cres.get().getString('children') + '>'));
    if (snapshotType) {
      for (let i = 0; i < nodes.snapshotLength; i++) {
        const node = nodes.snapshotItem(i);
        if (node.nodeType == Node.ATTRIBUTE_NODE) {
          const nodeName = Util.descriptionToName(node.nodeName);
          if (!format.hasField(nodeName)) format.addField(FieldFormatFactory.createType(Util.descriptionToName(node.nodeName), FieldConstants.STRING_FIELD));
        } else {
          if (node.attributes) {
            this.createFormatAttribute(node.attributes, format);
          }
        }
      }
    } else {
      const iterator = nodes[Symbol.iterator]();
      let element = iterator.next();
      while (!element.done) {
        if (element.value.nodeType == Node.ATTRIBUTE_NODE) {
          const nodeName = Util.descriptionToName(element.value.nodeName);
          if (!format.hasField(nodeName)) format.addField(FieldFormatFactory.createType(Util.descriptionToName(element.value.nodeName), FieldConstants.STRING_FIELD));
        } else {
          if (element.attributes) {
            this.createFormatAttribute(element.attributes, format);
          }
        }
        element = iterator.next();
      }
    }

    return format;
  }
  private buildAttributeNode(node: any, result: DataTable) {
    const rec = result.addRecord();

    rec.setValue(XPathFunction.FIELD_NODE_NAME, node.getNodeName());
    const nodeFormatName = Util.descriptionToName(node.nodeName);
    rec.setValue(nodeFormatName, node.getNodeValue());
  }
  private buildElementNode(node: any, result: DataTable) {
    const rec = result.addRecord();
    const nodeContentValue = node.firstChild ? node.firstChild.data : null;
    rec.setValue(XPathFunction.FIELD_NODE_NAME, node.nodeName);
    rec.setValue(XPathFunction.FIELD_NODE_CONTENT, nodeContentValue);
    rec.setValue(XPathFunction.FIELD_NODE_CHILDREN, this.tableFromNodes(node.childNodes, false));

    const attributes = node.attributes;
    if (attributes) {
      for (let i = 0; i < attributes.length; i++) {
        const attribute = attributes.item(i);
        rec.setValue(Util.descriptionToName(attribute.name), attribute.value);
      }
    }
  }
}
