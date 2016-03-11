import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import $ from 'jquery';
import { injectIntl, intlShape, defineMessages } from 'react-intl';

const styles = {
  modalContent: {
    alignItems: 'center'
  },

  modalDescription: {
    textAlign: 'center',
    marginLeft: '2em'
  }
};

const i18n = defineMessages({
  no: {
    id: 'comp.confirmCheckModal.no',
    defaultMessage: 'No'
  },
  yes: {
    id: 'comp.confirmCheckModal.yes',
    defaultMessage: 'Yes'
  },
});

@injectIntl
@Radium
export default class ConfirmCheckModal extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,

    showOn: PropTypes.bool.isRequired,
    header: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    iconDom: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func
  };

  componentDidMount() {
    $('#' + this.props.id)
      .modal({
        context: $('#app'),
        allowMultiple: true,
        onDeny: this.props.onCancel ? this.props.onCancel : () => {},
        onApprove: this.props.onConfirm,
        onHidden: this.props.onClose,
      })
    ;
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.showOn && nextProps.showOn) {
      $('#' + this.props.id)
        .modal('show')
      ;
    }
  }

  componentWillUnmount() {
    $('#' + this.props.id).remove();
  }

  render() {
    const { header, description, iconDom, className, id, style, intl: { formatMessage } } = this.props;

    return (
      <div className="ui confirm-check-modal basic modal" key={id} id={id} style={style}>
        <i className="close icon" />
        <div className="header">
          {header}
        </div>
        <div className="image content" style={styles.modalContent}>
          <div className="image">
            {iconDom}
          </div>
          <div className="description" style={styles.modalDescription}>
            <p>{description}</p>
          </div>
        </div>
        <div className="actions">
          <div className="two fluid ui inverted buttons">
            <div className="ui red basic inverted button deny">
              <i className="remove icon" />
              {formatMessage(i18n.no)}
            </div>
            <div className="ui green basic inverted button approve">
              <i className="checkmark icon" />
              {formatMessage(i18n.yes)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
