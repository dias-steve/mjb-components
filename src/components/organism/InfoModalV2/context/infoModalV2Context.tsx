/*===================================================================
=      INFO MODAL CONTEXT              =
====================================================================*/
/**
 * INFO MODAL CONTEXT V2
 *
 * 
 * 
 */

import React, { ReactNode, createContext, useContext, useState } from 'react'
import { infoModalConfigPreset } from '../utils/infoModalConfigPreset'
import InfoModalV2 from '../components/InfoModal/InfoModalV2'


//============TYPE===================
export type iconType =  'good' | 'bad' | 'neutral' | 'question' | 'sending'| 'loader'

export interface IConfigInfoModal {
    iconType?: iconType,
    title?: string | null,
    message?: string | null,
    labelBtn?: string | null,
    noBtnClose?: boolean | null,
    /**
     * value beetween 0 to 1
     */
    progressBarvalue?: number,

    loaderMode?: boolean,


    acceptBtnLabel ?: string,

    cancelBtnLabel ?: string,
    onClickBtnAccept?: (utils:{closeModal?: () => void}) => void,
    onClickBtnCancel?: (utils:{closeModal?: () => void}) => void,
}
export interface IInfoModdalHandlerData {
    config :IConfigInfoModal | null,
    isShowModal: boolean,
    noBtnClose: boolean,
    setConfig: (config:IConfigInfoModal | null) => void,
    setShowModal: (isShow: boolean) => void,
    setNoBtnClose: (isNoBtnClose: boolean) => void
}

/**
 * Context
 * @param param0 
 */

const InfoModalContext = createContext<IInfoModdalHandlerData | null>(null)

/**
 * info Modale Provider
 * @param param0 
 * @returns 
 */
export const InfoModalProvider = ({children}:{children: ReactNode}) => {
    const [config, setConfig] = useState<IConfigInfoModal | null >(null)
    const [isShowModal, setShowModal] = useState<boolean>(false)
    const [noBtnClose, setNoBtnClose] = useState<boolean>(false)

    const data : IInfoModdalHandlerData = {
        config,
        setConfig,
        isShowModal,
        setShowModal,
        noBtnClose,
        setNoBtnClose
    }

    return (
        <InfoModalContext.Provider value={data}>
            {children}
            <InfoModalV2/>
        </InfoModalContext.Provider>
    )

}

/**
 * Hook
 */

export function useInfoModalV2() {
    const contextData = useContext(InfoModalContext)
    if (!contextData){
        throw new Error('useInfoModal have to be use and wrapped with MBJBox Provider')
    }

    const { config,setConfig,isShowModal,setShowModal, noBtnClose,setNoBtnClose} = contextData

    const closeModal = () => {
    
        setShowModal(false)
        setConfig(null)
    }

     /**
     * Display the info modal 
     * @param config 
     */
    const displayInfoModal = (config: IConfigInfoModal) => {
   
        if(!isShowModal){
            setShowModal(true)
        }
        setConfig(config)
    }

    /**
     * Display a modal with a loader
     */
    const displayLoader = () => {
   
        if(!isShowModal){
            setShowModal(true)
        }
        setConfig(infoModalConfigPreset.LOADER)
    }

    return {
        configData: config,
        setConfig,
        isShow: isShowModal,
        setIsShow: setShowModal,
        noBtnClose,
        setNoBtnClose,
        closeModal:closeModal,
        displayInfoModal,
        displayLoader,
        closeLoader: closeModal
    }
}

export default useInfoModalV2
