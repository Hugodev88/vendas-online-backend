import { UpdatePasswordDto } from "../dtos/updatePassword.dto";

export const updatePasswordMock: UpdatePasswordDto = {
    lastPassword: '123',
    newPassword: 'fdsafj',
}

export const updatePasswordInvalidMock: UpdatePasswordDto = {
    lastPassword: 'lkfdjsa',
  newPassword: 'flkjbla',
}