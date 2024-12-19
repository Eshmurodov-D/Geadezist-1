import React from 'react';
import Table from '../../components/Table/Table'; // Table komponentini import qilish
import Button from '../../components/Button'; // Button komponentini import qilish

function District() {
  // Table uchun ma'lumotlar
  const tableData = [
    { id: 1, name: 'District 1', population: 120000 },
    { id: 2, name: 'District 2', population: 95000 },
    { id: 3, name: 'District 3', population: 80000 },
  ];

  // Table ustunlari
  const tableColumns = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'District Name' },
    { key: 'population', title: 'Population' },
    {
      key: 'actions',
      title: 'Actions',
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Button variant="primary" size="small" onClick={() => alert(`Viewing ${record.name}`)}>
            View
          </Button>
          <Button variant="danger" size="small" onClick={() => alert(`Deleting ${record.name}`)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">District Management</h1>
      <Table data={tableData} columns={tableColumns} className="shadow-lg" />
    </div>
  );
}

export default District;
