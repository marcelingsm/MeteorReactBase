import React from 'react';
import {withTracker} from "meteor/react-meteor-data";
import {exampleApi} from "../../api/exampleApi";
import SimpleForm from "../../../../ui/components/SimpleForm/SimpleForm";
import SimpleImageUploadBase64 from "../../../../ui/components/ImageUpload/SimpleImageUploadBase64";
import _ from 'lodash';
import {Form,Container, Header,Button} from "semantic-ui-react";



const ExampleDetail = ({screenState,loading,exampleDoc,save,history}) => {

    const handleSubmit = (doc) => {
        save(doc);
    }

    return (
        <Container text fluid>
            <Header as='h2'>{screenState==='view'?'Visualizar exemplo':(screenState==='edit'?'Editar Exemplo':'Criar exemplo')}</Header>
            <SimpleForm
                mode={screenState}
                schema={exampleApi.schema}
                doc={exampleDoc}
                onSubmit={handleSubmit}
                loading={loading}
            >

                <SimpleImageUploadBase64
                    label={'Imagem'}
                    name={'image'}
                    />
                <Form.Group key={'fields'}>
                    <Form.Input
                        placeholder='Titulo'
                        name='title'
                    />
                    <Form.Input
                        placeholder='Descrição'
                        name='description'
                    />
                </Form.Group>
                <Form.Group key={'Buttons'}>
                    <Button content={screenState==='view'?'Voltar':'Cancelar'}
                            onClick={screenState==='edit'?()=>history.push(`/example/view/${exampleDoc._id}`):()=>history.push(`/example/list`)}
                            secondary
                            type="button"
                    />

                    {screenState==='view'?(
                        <Button content={'Editar'}
                                onClick={()=>history.push(`/example/edit/${exampleDoc._id}`)}
                                primary
                                type="button"
                        />
                    ):null}
                    {screenState!=='view'?(
                        <Form.Button content={'Salvar'} primary/>
                    ):null}
                </Form.Group>
            </SimpleForm>
        </Container>
)
}

export const ExampleDetailContainer = withTracker((props) => {
    const {screenState,id} = props;
    const subHandle = exampleApi.subscribe('default',{_id:id});
    const exampleDoc = subHandle.ready()?exampleApi.findOne({_id:id}):{}

    return ({
        screenState,
        exampleDoc,
        save:(doc,callback)=>exampleApi.upsert(doc,(e,r)=>{
            if(!e) {
                props.history.push(`/example/view/${screenState==='create'?r:doc._id}`)
                props.showToast({
                    type:'success',
                    title:'Operação realizada!',
                    description: `O exemplo foi ${doc._id?'atualizado':'cadastrado'} com sucesso!`,
                })
            } else {
                console.log('Error:',e);
                props.showToast({
                    type:'error',
                    title:'Operação não realizada!',
                    description: `Erro ao realizar a operação: ${e.message}`,
                })
            }

        }),
    })
})(ExampleDetail)
