import React from 'react'
import '../styles/alert.scss'
import PropTypes from 'prop-types'
import 'animate.css'
import cs from 'classnames'

class Alert extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isShowErrorMesg: false
    }
  }
  static propTypes = {
    handleCancle: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  componentWillMount() {
    document.body.style.overflow = 'hidden'
    document.body.addEventListener('touchmove', this.stopScroll, false)
  }

  componentWillUnmount() {
    document.body.style.overflow = ''
    document.body.removeEventListener('touchmove', this.stopScroll, false)
  }

  stopScroll = e => {
    e.preventDefault()
  }

  onCancleClick = () => {
    const container = this.refs.container
    const classNames = cs('alert-body-container', 'animated', 'fadeOutRightBig', {fadeInRightBig: false})
    container.className = classNames
    setTimeout(() => {
      this.props.handleCancle()
    }, 500)
  }

  onSubmitClick = () => {
    const userId = this.refs.userId.value
    const idCard = this.refs.idcard.value
    if (userId && idCard) {
      this.props.handleSubmit(userId, idCard)
    } else {
      this.setState({
        isShowErrorMesg: true
      })
    }
  }

  render () {
    return (
      <div className="alert-container">
        <div className="overlay-container"></div>
        <div className="alert-body-container animated fadeInRightBig" ref="container">
          <header className="alert-body-header-container">
            <span>请填写员工信息</span>
          </header>
          <div className="alert-body-main-container">
            <div className="alert-body-input-container">
              <input placeholder="工号" ref="userId"/>
            </div>
            <div className="alert-body-input-container">
              <input placeholder="身份证号" ref="idcard"/>
            </div>
            <div className="alert-body-main-tips-container">
              <span>{this.state.isShowErrorMesg ? '❌ 请填写完整的员工信息' : ''}</span>
            </div>
          </div>
          <footer className="alert-footer-container">
            <div className="alert-footer-button-container">
              <button onClick={this.onCancleClick}>返回重投</button>
            </div>
            <div className="alert-footer-button-container">
              <button onClick={this.onSubmitClick}>确认投票</button>
            </div>
          </footer>
        </div>
      </div>
    )
  }
}

export default Alert
