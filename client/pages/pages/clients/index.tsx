/* eslint-disable @next/next/no-img-element */
import { appAxios } from '@/utils/axios';
import getConfig from 'next/config';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import { Rating } from 'primereact/rating';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { Demo } from '../../../types/types';


interface Client {
    id: number,
    first_name: string,
    last_name: string,
    age: number,
    gender: string
    height: number,
    weight: number,
    target_weight: number,
    chronic_ilnessess: string
}

const Crud = () => {

    let emptyClient: any = {
        first_name: "",
        last_name: "",
        age: 0,
        gender: "",
        height: 0,
        weight: 0,
        target_weight: 0,
        chronic_ilnessess: ""
    };

    const [clients, setClients] = useState([]);
    const [clientDialog, setClientDialog] = useState(false);
    const [deleteClientDialog, setDeleteClientDialog] = useState(false);
    const [deleteClientsDialog, setDeleteClientsDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [client, setClient] = useState<Client>(emptyClient);
    const toast = useRef<Toast>(null)
    const [selectedClients, setSelectedClients] = useState<Client[]>([]);
    const dt = useRef<DataTable>(null);

    useEffect(() => {
        appAxios.get(`/api/v1/clients/by_user/${localStorage.getItem("user_id")}`)
            .then((res) => {
                setClients(res.data.Clients)
            })
            .catch(err => {
                console.log(err);
            })
    }, []);


    const openNew = () => {
        setClient(emptyClient);
        setSubmitted(false);
        setClientDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setClientDialog(false);
    };

    const hideDeleteclientDialog = () => {
        setDeleteClientDialog(false);
    };

    const hideDeleteclientsDialog = () => {
        setDeleteClientsDialog(false);
    };

    const saveclient = () => {
        setSubmitted(true);
        if (client.first_name.trim()) {
            let _clients = [...clients];
            let _client = { ...client };
            if (client.id) {
                const index = findIndexById(client.id);

                _clients[index] = _client;
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'client Updated', life: 3000 });
            } else {
                appAxios.post("/api/v1/clients/", {
                    first_name: _client.first_name,
                    last_name: _client.last_name,
                    gender: _client.gender,
                    height: _client.height,
                    weight: _client.weight,
                    target_weight: _client.target_weight,
                    chronic_ilnessess: _client.chronic_ilnessess
                }, { withCredentials: true })
                    .then((res) => {
                        console.log(res);

                    })
                    .catch(err => {
                        console.log(err);

                    })
                _clients.push(_client);
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'client Created', life: 3000 });
            }

            setClients(_clients);
            setClientDialog(false);
            setClient(emptyClient);
        }
    };

    const editClient = (client: any) => {
        setClient({ ...client });
        setClientDialog(true);
    };

    const confirmDeleteClient = (client: any) => {
        setClient(client);
        setDeleteClientDialog(true);
    };

    const deleteClient = () => {
        let _clients = clients.filter((val) => val.id !== client.id);
        setClients(_clients);
        setDeleteClientDialog(false);
        setClient(emptyClient);
    };

    const findIndexById = (id: number) => {
        let index = -1;
        for (let i = 0; i < clients.length; i++) {
            if (clients[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const exportCSV = () => {
        dt.current?.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteClientsDialog(true);
    };

    const deleteSelectedClients = () => {
        let _clients = clients.filter((val) => !selectedClients?.includes(val));
        setClients(_clients);
        setDeleteClientsDialog(false);
        setSelectedClients([]);
    };

    const onCategoryChange = (e: RadioButtonChangeEvent) => {
        let _client = { ...client };
        _client['gender'] = e.value;
        setClient(_client);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _client = { ...client };
        _client[`${name}`] = val;

        setClient(_client);
    };

    const onInputNumberChange = (e: InputNumberValueChangeEvent, name: string) => {
        const val = e.value || 0;
        let _client = { ...client };
        _client[`${name}`] = val;

        setClient(_client);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
                    <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedClients || !selectedClients.length} />
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Import" className="mr-2 inline-block" />
                <Button label="Export" icon="pi pi-upload" severity="help" onClick={exportCSV} />
            </React.Fragment>
        );
    };

    const codeBodyTemplate = (rowData: any) => {
        return (
            <>
                <span className="p-column-title">Ad ve Soyad</span>
                {rowData.first_name} {rowData.last_name}
            </>
        );
    };

    const nameBodyTemplate = (rowData: any) => {
        return (
            <>
                <span className="p-column-title">Yaş</span>
                {rowData.age}
            </>
        );
    };


    const priceBodyTemplate = (rowData: any) => {
        return (
            <>
                <span className="p-column-title">Cinsiyet</span>
                {rowData.gender}
            </>
        );
    };

    const categoryBodyTemplate = (rowData: any) => {
        return (
            <>
                <span className="p-column-title">Boy</span>
                {rowData.height}
            </>
        );
    };

    const ratingBodyTemplate = (rowData: any) => {
        return (
            <>
                <span className="p-column-title">Kilo</span>
                {rowData.weight}
            </>
        );
    };

    const statusBodyTemplate = (rowData: any) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                {rowData.chronic_ilnessess ?? "Yok"}
            </>
        );
    };

    const actionBodyTemplate = (rowData: any) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editClient(rowData)} />
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteClient(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Danışanlarım</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const clientDialogFooter = (
        <>
            <Button label="İptal" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Onayla" icon="pi pi-check" text onClick={saveclient} />
        </>
    );
    const deleteclientDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteclientDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteClient} />
        </>
    );
    const deleteclientsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteclientsDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteSelectedClients} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={clients}
                        selection={selectedClients}
                        onSelectionChange={(e) => setSelectedClients(e.value as Demo.client[])}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} clients"
                        globalFilter={globalFilter}
                        emptyMessage="Danışan Bulunamadı!"
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="code" header="Ad ve Soyad" sortable body={codeBodyTemplate}></Column>
                        <Column field="name" header="Yaş" sortable body={nameBodyTemplate}></Column>
                        <Column field="price" header="Cinsiyet" body={priceBodyTemplate} sortable></Column>
                        <Column field="category" header="Boy(cm)" sortable body={categoryBodyTemplate}></Column>
                        <Column field="rating" header="Kilo(kg)" body={ratingBodyTemplate} sortable></Column>
                        <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column header="İşlemler" body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={clientDialog} style={{ width: '450px' }} header="Client Details" modal className="p-fluid" footer={clientDialogFooter} onHide={hideDialog}>
                        <div className="formgrid grid">
                            <div className='field col'>
                                <label htmlFor="first_name">Ad</label>
                                <InputText id="first_name" value={client.first_name} onChange={(e) => onInputChange(e, 'first_name')} required autoFocus className={classNames({ 'p-invalid': submitted && !client.first_name })} />
                                {submitted && !client.first_name && <small className="p-invalid">Name is required.</small>}
                            </div>
                            <div className='field col'>
                                <label htmlFor="last_name">Soyad</label>
                                <InputText id="last_name" value={client.last_name} onChange={(e) => onInputChange(e, 'last_name')} required autoFocus className={classNames({ 'p-invalid': submitted && !client.last_name })} />
                                {submitted && !client.last_name && <small className="p-invalid">Lastname is required.</small>}
                            </div>
                        </div>


                        <div className="field">
                            <label className="mb-3">Cinsiyet</label>
                            <div className="formgrid grid">
                                <div className="field-radiobutton col-4">
                                    <RadioButton inputId="category1" name="category" value="Erkek" onChange={onCategoryChange} checked={client.gender === 'Erkek'} />
                                    <label htmlFor="category1">Erkek</label>
                                </div>
                                <div className="field-radiobutton col-4">
                                    <RadioButton inputId="category2" name="category" value="Kadın" onChange={onCategoryChange} checked={client.gender === 'Kadın'} />
                                    <label htmlFor="category2">Kadın</label>
                                </div>
                                <div className="field-radiobutton col-4">
                                    <RadioButton inputId="category3" name="category" value="Diğer" onChange={onCategoryChange} checked={client.gender === 'Diğer'} />
                                    <label htmlFor="category3">Diğer</label>
                                </div>

                            </div>
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="price">Boy</label>
                                <InputNumber id="price" value={client.height} onValueChange={(e) => onInputNumberChange(e, 'height')} />
                            </div>
                            <div className="field col">
                                <label htmlFor="quantity">Kilo</label>
                                <InputNumber id="quantity" value={client.weight} onValueChange={(e) => onInputNumberChange(e, 'weight')} />
                            </div>
                            <div className="field col">
                                <label htmlFor="quantity">Hedef Kilo</label>
                                <InputNumber id="quantity" value={client.target_weight} onValueChange={(e) => onInputNumberChange(e, 'target_weight')} />
                            </div>
                        </div>
                        <div className="field">
                            <label htmlFor="description">Kronik Hastalık</label>
                            <InputTextarea id="description" value={client.chronic_ilnessess} onChange={(e) => onInputChange(e, 'chronic_ilnessess')} required rows={3} cols={20} />
                        </div>

                    </Dialog>

                    <Dialog visible={deleteClientDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteclientDialogFooter} onHide={hideDeleteclientDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {client && (
                                <span>
                                    Are you sure you want to delete <b>{client.first_name} {client.last_name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteClientsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteclientsDialogFooter} onHide={hideDeleteclientsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {client && <span>Are you sure you want to delete the selected clients?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Crud;