import React, {Component, BaseSyntheticEvent} from "react";
import {Form} from "semantic-ui-react";
import {hasValue} from "/imports/libs/hasValue";
import _ from "lodash";

interface ISimpleSubFormProps {
    name:string;
    label:string;
    value:[];
    subSchema:object;
    setError:(isError:boolean)=> void;
    onChange: {(event: object, field: object): void };
    readOnly?:boolean;
    error?:boolean;
}

interface ISimpleSubFormState {
    subDoc: object[]
}

class  SimpleSubForm  extends Component<ISimpleSubFormProps, ISimpleSubFormState> {

    state = {
        subDoc: [],
    }


    validateFields () {
        this.props.setError(true)
    }

    componentDidMount() {
        if (this.props.value) {
            this.setState({subDoc: this.props.value})
        }
    }


    validateSubForm (value:[], subSchema:object) {
        let isError:boolean[] = [];
        if(value&&value.length > 0){
            value.map(field=> {
                Object.keys(subSchema).map(keySchema => {
                    if(subSchema[keySchema]&&subSchema[keySchema].optional){
                        return isError.push(false);
                    }else if(field[keySchema]&&field[keySchema].length > 0){
                        return isError.push(false)
                    }else{
                        return isError.push(true)
                    }
                })
            })
        }
        const error:boolean = isError.indexOf(true) !== -1
        this.props.setError(error);
    }

    componentDidUpdate = (prevProps: ISimpleSubFormProps ) => {
        if (!!this.props.value && !_.isEqual(this.props.value, prevProps.value) || !_.isEqual(this.props.value, this.state.subDoc)) {
            this.setState({subDoc: this.props.value})
        }

        this.validateSubForm( prevProps.value, this.props.subSchema )
        return null;
    }

    onClickAddSubForm = () => {
        const{subDoc} = this.state
        const{name, onChange} = this.props
        this.validateFields();
        const number = Math.random()
        const id = number.toString(36).substr(2, 9);
        const newSubDoc = [...subDoc, {id: id}]
        this.setState({subDoc:newSubDoc});
        onChange({target: {name, value: newSubDoc}},{name , value:newSubDoc})
    }

   onChangeFiled = (event: BaseSyntheticEvent, key: string, idDoc: string) => {
        const{name, onChange} = this.props
        const newSubDoc = this.state.subDoc
        newSubDoc && newSubDoc.map((doc: any) => {
            if (doc.id === idDoc) {
                return doc[key] = event.target.value
            }
        })
        this.setState({subDoc:newSubDoc});
        onChange({target: {name, value: newSubDoc}},{name , value:newSubDoc})
    }

   deleteSubForm = (id: string) => {
       const{name,onChange} = this.props
        const newSubDoc = this.state.subDoc && this.state.subDoc.filter((doc: { id:string }) => doc.id !== id);
        this.setState({subDoc:newSubDoc});
        onChange({target: {name, value: newSubDoc}},{name , value:newSubDoc})
    }

    render() {
        const{subDoc} = this.state
        const{subSchema, label, readOnly} = this.props

        if (!!readOnly) {
            return subDoc && subDoc.map((doc, index) => {
                return (
                    <div key={index} className="ui card">
                        {hasValue(label) ? (<label>{label}</label>) : null}
                        {subSchema && Object.keys(subSchema).map(schemaKey => {
                            return hasValue(doc[schemaKey]) ? (<label key={schemaKey}>{doc[schemaKey]}</label>) : null
                        })}
                    </div>
                )
            })
        }


        return (<>
                <a onClick={this.onClickAddSubForm} style={{cursor: 'pointer'}}>{`Adicionar ${label}`}<br/></a>
                {subDoc && subDoc.length > 0 &&
                subDoc.map((doc: any, index) => {
                    return (
                        <div key={index}>
                            <i onClick={() => this.deleteSubForm(doc.id)} style={{cursor: 'pointer'}} className="trash icon"/>
                            {subSchema && doc && Object.keys(subSchema).map((schemaKey:any) => {
                                return <Form.Input
                                    key={schemaKey}
                                    placeholder={subSchema[schemaKey]&& subSchema[schemaKey].label? subSchema[schemaKey].label: schemaKey }
                                    name={schemaKey}
                                    value={doc[schemaKey]? doc[schemaKey] : ''}
                                    onChange={(event) => this.onChangeFiled(event, schemaKey, doc.id)}
                                />
                            })
                            }
                        </div>)
                })
                }
            </>
        );
    }
}

export default SimpleSubForm