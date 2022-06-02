import './CheckBoxControls.css'

import {AiOutlinePlusCircle} from 'react-icons/ai'
import { Component } from 'react';

export class CheckBoxControls extends Component {
    constructor(props){
        super(props)
        let init_checkboxes = [];
        for (let i=0; i < Math.min(props.values.length, props.maxNumber); i++){
            init_checkboxes.push(
                {value: props.values[i], checked: false}
            )
        }
        this.state = {
            dynamic: props.dynamic,
            new_check: '',
            max_boxes: props.maxNumber,
            checkboxes: init_checkboxes,
        }
        
        
        this.handleType = this.handleType.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleType(event) {
        this.setState({new_check: event.target.value})
    }

    handleSubmit(event) {
        let updatedCheckboxes = this.state.checkboxes
        updatedCheckboxes.unshift({value: this.state.new_check, checked: true})
        updatedCheckboxes = updatedCheckboxes.slice(0, this.state.max_boxes)
        this.setState({
            checkboxes: updatedCheckboxes,
            new_check: ''
        })
        event.preventDefault()
        this.handleCheckedList();
    }

    handleChange(position) {
        let updatedCheckboxes = this.state.checkboxes
        updatedCheckboxes[position].checked = !updatedCheckboxes[position].checked
        console.log("updated", updatedCheckboxes)
        this.setState({checkboxes: updatedCheckboxes})
        this.handleCheckedList();
    }

    handleCheckedList() {
        let checked = []
        for(let i=0; i<this.state.checkboxes.length; i++){
            this.state.checkboxes[i].checked && (checked.push(this.state.checkboxes[i].value))
        }
        this.props.setList(checked);
    }

    render() {
        return (
            <div class="checkbox-control">
                {this.state.checkboxes.map(
                    ({value, checked}, index) =>
                    (
                        <div class="form-check">
                            <input 
                            key={"chk-" + value}
                            class="form-check-input" 
                            type="checkbox" 
                            value={value} 
                            id={"chck-" + value} 
                            checked={checked}
                            onChange={() => this.handleChange(index)}
                             />
                            <label class="form-check-label" for={"chck-" + value}>
                                {value}
                            </label>
                        </div>
                    )
                )}
                {this.state.dynamic &&
                    <form onSubmit={this.handleSubmit} class="mt-2">
                        <div class="input-group pe-2 mb-3 align-items-center">
                            <input 
                            type="text" 
                            value={this.state.new_check} 
                            class="form-control form-for-checkbox" 
                            onChange={this.handleType}
                            placeholder="Other ..."
                            />
                            <AiOutlinePlusCircle class="plus-icon"/>
                        </div>
                    </form>
                }
            </div>
            
        )
    }
}