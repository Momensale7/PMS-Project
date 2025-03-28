import React, { useState } from 'react'

function useTogglePassword() {
    const [showPass, setShowPass] = useState<boolean>(false);
    const [showConfirmPass, setConfirmPass] = useState<boolean>(false);

    const handleShowPass = (): void => setShowPass((prev) => !prev);
    const handleConfirmPass = (): void => setConfirmPass((prev) => !prev);

    return{showPass,showConfirmPass,handleShowPass,handleConfirmPass}
}

export default useTogglePassword