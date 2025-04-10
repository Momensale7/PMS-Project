import React, { useState } from 'react'

function useTogglePassword() {
    const [showPass, setShowPass] = useState<boolean>(false);
    const [showConfirmPass, setConfirmPass] = useState<boolean>(false);
    const [showOldPass, setOldPass] = useState<boolean>(false);
    const handleShowPass = (): void => setShowPass((prev) => !prev);
    const handleConfirmPass = (): void => setConfirmPass((prev) => !prev);
    const handleOldPass = (): void => setOldPass((prev) => !prev);
    return{showPass,showConfirmPass,showOldPass,handleShowPass,handleConfirmPass,handleOldPass}
}

export default useTogglePassword