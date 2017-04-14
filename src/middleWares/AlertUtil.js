import swal from 'sweetalert'
import 'sweetalert/dist/sweetalert.css'
import 'sweetalert/themes/google/google.css'

export const showErrorMesg = (title, errorMesg, callback) => {
  swal({
    title,
    text: errorMesg,
    type: 'error'
  }, isConfirm => {
    if (isConfirm && typeof(callback) === 'function') {
      callback()
    }
  })
}

export const showSucceedMesg = (title, successMesg, callback) => {
  swal({
    title,
    text: successMesg,
    type: 'success'
  }, isConfirm => {
    if (isConfirm && typeof(callback) === 'function') {
      callback()
    }
  })
}
