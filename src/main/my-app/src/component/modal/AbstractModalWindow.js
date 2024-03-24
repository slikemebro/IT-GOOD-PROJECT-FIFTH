import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./AbstractModalWindow.css";

class AbstractModalWindow extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        children: PropTypes.node,
        onClose: PropTypes.func.isRequired
    };

    handleCloseClick = () => {
        this.props.onClose();
    };

    render() {
        const {title, children} = this.props;

        return (
            <div className="abstract-modal-window">
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button onClick={this.handleCloseClick}>Закрыть</button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        );
    }
}

export default AbstractModalWindow;
