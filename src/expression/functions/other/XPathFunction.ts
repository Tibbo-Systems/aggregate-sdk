import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Util from '../../../util/Util';

export default class XPathFunction extends AbstractFunction {
  public static FIELD_NODE_NAME = 'nodeName';
  public static FIELD_NODE_CONTENT = 'nodeContent';
  public static FIELD_NODE_CHILDREN = 'nodeChildren';

  constructor() {
    super(Functions.GROUP_OTHER, 'String xml, String query [, Boolean table]', 'Object', Cres.get().getString('fDescXPath'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(2, false, parameters);

    /*
        try
        {
            const toTable = parameters.length >= 3 ? Util.convertToBoolean(parameters[2], true, false) : false;

            const factory = DocumentBuilderFactory.newInstance();
            const builder = factory.newDocumentBuilder();

            builder.setEntityResolver((publicId, systemId) -> {
                return new InputSource(new StringReader("")); // Returns a valid dummy source
            });

            Document doc = builder.parse(new InputSource(new StringReader(parameters[0].toString())));

            XPathFactory xPathfactory = XPathFactory.newInstance();
            XPath xpath = xPathfactory.newXPath();
            XPathExpression expr = xpath.compile(parameters[1].toString());
            NodeList nodeList = (NodeList) expr.evaluate(doc, XPathConstants.NODESET);
            List<Node> nodes = nodesToList(nodeList);

            if (toTable)
            {
                return tableFromNodes(nodes);
            }
            else
            {
                return stringFromNodes(nodes);
            }
        }
        catch (Exception ex)
        {
            throw new EvaluationException(ex.getMessage(), ex);
        }
*/
  }
}
