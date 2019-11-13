import DataTable from '../DataTable';

export default interface TableValidator {
  getType(): string;

  encode(): string;

  validate(table: DataTable): void;
}
