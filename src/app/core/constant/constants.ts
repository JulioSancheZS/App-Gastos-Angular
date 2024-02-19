export const constants = {
  CURRENT_TOKEN: 'CURRENT_TOKEN',
};

const apirUrl = 'https://localhost:7018/api';

export const apiEndPoint = {
  AuthEndPoint: {
    login: `${apirUrl}/Authenticacion/login`,
    register: `${apirUrl}/Authenticacion/register`,
  },
  CategoriaEndPoint: {
    get: `${apirUrl}/Categoria`,
    post: `${apirUrl}/Categoria`,
    put: `${apirUrl}/Categoria`
  },
  LugarEndPoint:{
    get: `${apirUrl}/Lugar`,
    post: `${apirUrl}/Lugar`,
    put: `${apirUrl}/Lugar`
  },
  MetodoPagoEndPoint: {
    get: `${apirUrl}/MetodoPago`
  },
  TransaccionEndPoint: {
    getByFecha: `${apirUrl}/Transaccion`,
    post: `${apirUrl}/Transaccion`
  }
};

// ?mes=${mes}
