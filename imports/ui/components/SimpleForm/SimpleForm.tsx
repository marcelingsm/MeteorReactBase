import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import {hasValue} from "../../../libs/hasValue";
import _ from 'lodash';
import { Image,Message,Icon } from 'semantic-ui-react'


const FieldComponent = ({reactElement,...props}) => {

    const [error,setError] = React.useState(false)
    const [value,setValue] = React.useState(props.initialValue||'')
    const [mode,setMode] = React.useState(props.mode||'edit')
    const [changeByUser,setChangeByUser] = React.useState(false)

    React.useEffect(() => {
        // Atualiza o titulo do documento usando a API do browser
        if(!changeByUser&&!hasValue(value)&&!!hasValue(props.initialValue)) {
            setValue(props.initialValue);
        }
        if(mode!==props.mode) {
            setMode(props.mode);
        }
    });

    props.setFieldMethods({
        validateRequired: (hasError)=>{
            if(hasError) {
                setError(true);
                return false;
            } else if(hasValue(hasError)&&hasError===false) {
                setError(false);
                return true;
            }
            if(!hasValue(value)) {
                setError(true);
                return false;
            } else if(!!error) {
                setError(true);
                return true;
            }
            return true;

        },
        setValue:(newValue)=>{
            if(hasValue(newValue)) {
                setValue(newValue);
                return true;
            }
            return false;

        },
        setMode:(newMode)=>{
            if(newMode!==mode) {onChange
                setMode(newMode);
                return true;
            }
            return false;
        },
    })



    const onChange = (e,field)=>{

        setValue(field.value);
        props.setDoc({[field.name]:field.value});
        if(!changeByUser) {
            setChangeByUser(true);
        }
        if(reactElement.props.onChange) {
            reactElement.props.onChange(e,field);
        }
    }

    return (React.cloneElement(reactElement, { value, onChange,
            error:error&&(!value||value.length===0)?true:undefined,
            label:reactElement.props.label||(props.fieldSchema?props.fieldSchema.label:undefined),
            readOnly:mode==='view',
            transparent:mode==='view'?true:undefined,
        }))
}

class SimpleForm extends Component {

    docValue = {};
    fields = {};
    state = {error:null,
    mode:this.props.mode||'edit',
    formElements:null,
    };

    setDoc = (newDoc) => {
    this.docValue = {...this.docValue,...newDoc};
    }

    
    wrapElement = (element,index) => {
        const self=this;
        if(element.type.name==='FormButton') {
            return React.cloneElement(element, {
               type:element.props.onChange?'button':'submit',
               onSubmit:element.props.onChange?undefined:element.props.onSubmit,
            })
        } else if(element.type.name==='Button') {
            return element;
        }
        self.fields[element.props.name]={type:element.type.name,};
        if(element.type.name==='FormGroup'||element.type.name==='Segment') {
            const subElements = React.Children.toArray(element.props.children).map((element,index)=>{
                return self.wrapElement(element,index)
            });
            const newElement = React.cloneElement(element, { children: subElements })
            return newElement;
        } else {
            return <FieldComponent
                key={element.props.name?element.props.name:('el'+index)}
                fieldSchema={self.props.schema?self.props.schema[element.props.name]:undefined}
                initialValue={self.props.doc?self.props.doc[element.props.name]:''}
                reactElement={element}
                setDoc={this.setDoc}
                mode={self.props.mode}
                setFieldMethods={(methods)=>self.fields[element.props.name]={...self.fields[element.props.name],...methods}}
            />
        }

    }
    
    initFormElements = (update=false) => {
        const self = this;
        if(!update&&(!!this.formElements||!!this.state.formElements)) {
            return this.state.formElements||this.formElements;
        }

        let elements = React.Children.toArray(this.props.children);
        const ListaOfElements = elements.map((element,index)=>{
            return this.wrapElement(element,index)
        })

        return ListaOfElements;

    }

    validate = () => {
        const self = this;
        const fielsWithError = [];

        if(this.props.schema) {
            Object.keys(this.fields).forEach(field=>{
                if(this.props.schema[field]&&!this.props.schema[field].optional&&!this.fields[field].validateRequired()) {
                    fielsWithError.push(this.props.schema[field].label);
                }
            })
        }

        if(fielsWithError.length>0) {
            this.setState({error:fielsWithError});
        } else if(!!this.state.error) {
            this.setState({error:null});
        }


        return fielsWithError.length===0;
    }

    onSubmitForm = (event,...others) => {
       if(this.props.onSubmit&&this.validate()) {
           this.props.onSubmit(this.docValue)
       } else {
           console.log('Erro no formulário')
       }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if((!_.isEqual(this.props.doc,prevProps.doc))||(this.props.mode!==prevProps.mode)) {
            const update=true;
            this.docValue = {...this.docValue,...(this.props.doc||{})};
            this.setState({formElements:this.initFormElements(update)});
            this.setState({mode:this.props.mode});
        }

    }

    render() {

        this.formElements = this.state.formElements||this.initFormElements();

        return (
            <div style={this.props.style||{width:'100%'}}>
                <Form  onSubmit={this.onSubmitForm} loading={this.props.loading}>
                    {this.formElements}
                </Form>
                {this.state.error?(
                <Message attached='bottom' warning>
                    <Icon name='warning' />
                    {'Há erros nos seguintes campos:'+this.state.error.join(', ')}
                </Message>
                ):null}
            </div>
                )
    }
}

export default SimpleForm
