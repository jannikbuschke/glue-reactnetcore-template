import * as React from "react";

import { NavLink } from "react-router-dom";

import {
  CustomPaging,
  DataTypeProvider,
  PagingState,
  SortingState,
  TableColumnResizingProps
} from "@devexpress/dx-react-grid";

import {
  Grid,
  PagingPanel,
  Table,
  TableHeaderRow,
  TableColumnResizing
  // tslint:disable-next-line:no-implicit-dependencies
} from "@devexpress/dx-react-grid-bootstrap3";

import { DataLoader, IDataProps } from "../Api";
import { OdataContext, IOdataCollectionResponse } from "../Api/OdataContext";

interface IColumn {
  name: string;
  title: string;
  getCellValue?: (row: any) => any;
}

export interface IOdataListProps {
  columns: IColumn[];
  links: string[];
  // totalCount?: number;
  // items: any[];
  path: string;
  odataPath: string;
  expand?: string;
  tableColumnResizingProps?: TableColumnResizingProps;
}

const getRowId = (row: any) => row.id;
const pageSize = 10;
export class OdataList extends React.Component<IOdataListProps, any> {
  public state = { page: 0, pageSize: 10, sorting: [] };
  public render() {
    const { columns, links } = this.props;
    const { page } = this.state;
    return (
      <div style={{ paddingLeft: "3px" }}>
        <OdataContext
          expand={this.props.expand}
          render={ctx => (
            <DataLoader url={`${this.props.odataPath}?${ctx.params}`}>
              {({ data }: IDataProps<IOdataCollectionResponse>) => (
                <Grid
                  rows={data ? (data.value ? data.value : []) : []}
                  columns={columns || []}
                  getRowId={getRowId}
                >
                  <DataTypeProvider
                    for={links}
                    formatterComponent={this.linkFormatter}
                  />
                  <SortingState
                  // sorting={sorting || []}
                  // onSortingChange={changeSorting}
                  />
                  <PagingState
                    currentPage={page}
                    // tslint:disable-next-line:jsx-no-lambda
                    onCurrentPageChange={(currentPage: number) => {
                      // tslint:disable-next-line:no-console
                      console.log("change pagesize", pageSize, currentPage);
                      this.setState({ page: currentPage });
                      ctx.setSkip(pageSize * currentPage);
                      ctx.setTop(pageSize);
                    }}
                    pageSize={pageSize}
                    // tslint:disable-next-line:jsx-no-lambda
                    onPageSizeChange={(newPageSize: number) => {
                      ctx.setSkip(newPageSize * page);
                      ctx.setTop(newPageSize);
                    }}
                  />
                  <Table />
                  <CustomPaging
                    totalCount={data ? data["@odata.count"] : undefined}
                  />
                  <TableColumnResizing
                    {...this.props.tableColumnResizingProps}
                  />
                  <TableHeaderRow showSortingControls={true} />
                  <PagingPanel pageSizes={[10, 20, 50]} />
                </Grid>
              )}
            </DataLoader>
          )}
        />
      </div>
    );
  }
  //   public changeSorting = (sorting: any) =>
  //   this.setState({ sorting, loadingState: 'INVALID' });
  // public changeFilters = (filters: any) =>
  //   this.setState({ filters, loadingState: 'INVALID', currentPage: 0 });
  // public changeCurrentPageSize = (pageSize: number) =>
  //   this.setState({ currentPage: 0, pageSize, loadingState: 'INVALID' });
  // public changeCurrentPage = (currentPage: number) => {
  //   this.setState({ currentPage, loadingState: 'INVALID' });
  // };
  private linkFormatter = (value: any) => {
    const { path } = this.props;
    return (
      <NavLink to={`${path}/${value.row.id}`}>
        {value.row[value.column.name]}
      </NavLink>
    );
  };
}
