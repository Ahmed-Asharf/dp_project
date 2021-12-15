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

export const UserEdit = props => (
    <Edit {...props}>
        <SimpleForm>
           <TextInput source="id"/>
           <TextInput source="userName"/>
           <TextInput source="password"/>
           <TextInput source="EMAIL"/>
           <TextInput source="phone"/>
           <TextInput source="isBanned"/>
           <TextInput source="noOfTournaments"/>
           <TextInput source="tour_id"/>
           <TextInput source="team_id"/>
        </SimpleForm>
    </Edit>
 );
 
 export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
           <TextInput source="id"/>
           <TextInput source="userName"/>
           <TextInput source="password"/>
           <TextInput source="EMAIL"/>
           <TextInput source="phone"/>
        </SimpleForm>
    </Create>
 );
export const UserList = props => (
   <List {...props}>
       <Datagrid rowClick="edit">
           <TextField source="id" />
           <TextField source="userName" />
           <EmailField source="EMAIL" />
           <TextField source="phone" />
           <EditButton />
           <DeleteButton />
       </Datagrid>
   </List>
);