import './Notification.styles.css'

const Notification = (props) => {

  return (
    <div>
      <p className={props.class}>{props.message}</p>
    </div>
  )
}

export default Notification