import React, { Component } from 'react'
import {Container, ListGroup, ListGroupItem, Button} from'reactstrap'
import { connect } from 'react-redux'
import { getItems, deleteItem } from '../action/itemAction'
import PropTypes from 'prop-types'

class UserProfile extends Component {

    componentDidMount(){
        this.props.getItems()
    }

    static protoTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }

    onDeleteClick = (id) => {
        this.props.deleteItem(id)
    }
    
    render() {
        const { items } = this.props.item
        return (
            <div>
                <Container>
                    
                    <ListGroup>
                        {items.map(({_id, name})=>(
                            <ListGroupItem key={_id}>
                                { this.props.isAuthenticated ? <Button
                                    className="remove-btn"
                                    color="danger"
                                    size="sm"
                                    onClick={this.onDeleteClick.bind(this, _id)}
                                >&times;</Button> : null}
                                {name}
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </Container>
            </div>
        )
    }
}



const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated

})

export default connect(mapStateToProps, { getItems, deleteItem })(UserProfile)
