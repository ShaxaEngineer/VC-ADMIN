import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const successMasseg = (text: string) => {
  const toast = withReactContent(Swal).mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    showCloseButton: true,
    customClass: {
      popup: `!text-white !bg-[#00ab55] tw-close-button !p-1`,
    },
  });
  toast.fire({
    title: text ?? 'success',
  });
};

export const errorMasseg = (text: string) => {
  const toast = withReactContent(Swal).mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    showCloseButton: true,
    timerProgressBar: true,
    customClass: {
      popup: `!text-white !bg-[#e7515a] tw-close-button !p-1`,
    },
  });
  toast.fire({
    title: text ?? 'error',
  });
};

export const infoMasseg = (text: string) => {
  const toast = withReactContent(Swal).mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    showCloseButton: true,
    customClass: {
      popup: `!text-white !bg-[#e2a03f] tw-close-button !p-1`,
    },
  });
  toast.fire({
    title: text ?? 'warning',
  });
};
