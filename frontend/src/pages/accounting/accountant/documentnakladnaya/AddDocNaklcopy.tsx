import { useEffect, useState } from 'react';
import {
  DataGrid,
  GridColumns,
  GridRowsProp,
  GridValueSetterParams,
  GridColDef,
  MuiEvent,
  GridCellEditStopParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { randomTraderName, randomId } from '@mui/x-data-grid-generator';

export default function BasicEditingGrid() {
  const [myRows, set_MyRows] = useState(rows);
  const taxPercent = 7;
  const marginPercent = 20;

  useEffect(() => {
    console.log(myRows);
  }, [myRows]);

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={myRows}
        columns={columns}
        experimentalFeatures={{ newEditingApi: true }}
        onCellEditStop={(params: GridCellEditStopParams, event: MuiEvent) => {
          console.log(myRows);
        }}
      />
    </div>
  );
}

function get__rowSumBuy(params: GridValueGetterParams) {
  params.row.rowSumBuy = (params.row.amount * params.row.priceBuy).toFixed(2);
  return params.row.rowSumBuy;
}
function get__rowSumSell(params: GridValueGetterParams) {
  params.row.rowSumSell = (params.row.amount * params.row.priceSell).toFixed(2);
  return params.row.rowSumSell;
}

const columns: GridColumns = [
  { field: 'product', headerName: 'Товар', width: 180, editable: true },
  { field: 'amount', headerName: 'кол-во', type: 'number', editable: true },
  {
    field: 'priceBuy',
    headerName: 'ценаЗакуп',
    type: 'number',
    editable: true,
  },
  {
    field: 'priceSell',
    headerName: 'ценаПродаж',
    type: 'number',
    editable: true,
  },
  {
    field: 'rowSumBuy',
    headerName: 'СуммаЗакуп',
    type: 'number',
    editable: false,
    valueGetter: get__rowSumBuy,
  },
  {
    field: 'rowSumSell',
    headerName: 'СуммаПродаж',
    type: 'number',
    editable: false,
    valueGetter: get__rowSumSell,
  },
];

const rows: GridRowsProp = [
  {
    id: randomId(),
    product: randomTraderName(),
    amount: 3,
    priceBuy: 5,
    priceSell: 8,
  },
  {
    id: randomId(),
    product: randomTraderName(),
    amount: 4,
    priceBuy: 5,
    priceSell: 6,
  },
  {
    id: randomId(),
    product: randomTraderName(),
    amount: 5,
    priceBuy: 6,
    priceSell: 7,
  },
  {
    id: randomId(),
    product: randomTraderName(),
    amount: 8,
    priceBuy: 9,
    priceSell: 10,
  },
  {
    id: randomId(),
    product: randomTraderName(),
    amount: 11,
    priceBuy: 12,
    priceSell: 13,
  },
];
