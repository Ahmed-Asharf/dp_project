import React from 'react';
import {List,
    TextInput,
    SimpleForm,
    Edit,
    Create,
    ReferenceInput,
    SelectInput,
    Datagrid,
    ReferenceField,
    TextField,
    EmailField,
    EditButton,
    DeleteButton,
    EditGuesser} from 'react-admin';

export const EventEdit = props => (
    <Edit {...props}>
        <SimpleForm>
           <TextInput source="id"/>
           <TextInput source="STARTDATE"/>
           <TextInput source="ENDDATE"/>
           <TextInput source="PRIZE"/>
           <TextInput source="IMAGE"/>
           <TextInput source="description" options={{ multiLine: true }}/>
           <TextInput source="TAGLINE"/>
           <TextInput source="maxplayers"/>
           <TextInput source="players_per_team"/>
        </SimpleForm>
    </Edit>
 );
 
 export const EventCreate = props => (
    <Create {...props}>
        <SimpleForm>
        <TextInput source="id"/>
           <TextInput source="STARTDATE"/>
           <TextInput source="ENDDATE"/>
           <TextInput source="PRIZE"/>
           <TextInput source="IMAGE"/>
           <TextInput source="description"  options={{ multiLine: true }}/>
           <TextInput source="TAGLINE"/>
           <TextInput source="maxplayers"/>
           <TextInput source="players_per_team"/>
        </SimpleForm>
    </Create>
 );
export const EventList = props => (
   <List {...props}>
       <Datagrid rowClick="edit">
           <TextField source="id" />
           <TextField source="STARTDATE" />
           <TextField source="ENDDATE" />
           <TextField source="PRIZE" />
           <TextField source="IMAGE"/>
           <TextField source="description"/>
           <TextField source="TAGLINE"/>
           <TextField source="maxplayers"/>
           <TextField source="players_per_team"/>
           <EditButton />
           <DeleteButton />
       </Datagrid>
   </List>
);