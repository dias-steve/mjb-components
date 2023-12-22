/*===================================================================
=       Info Modal Config Preset                   =
====================================================================*/
/**
 * 
 */

import { IConfigInfoModal } from "../context/infoModalV2Context"; 


export type InfoModalPreset ={
    PASSWORD_OR_ID_NOT_PROVIDED: IConfigInfoModal;
   BAD_PASSWORD_OR_ID : IConfigInfoModal
   NETWORK_PB :IConfigInfoModal
   INTERN_ERROR : IConfigInfoModal
   SESSION_ENDED : IConfigInfoModal
   FORM_NOT_VALID : IConfigInfoModal
   NEW_SPENDING_DEMAND_SENDED : IConfigInfoModal
   IS_SENDING_LOADER : IConfigInfoModal
   CHANGE_VALIDATED : IConfigInfoModal
   LOADER : IConfigInfoModal
   NEW_LOAN_DEMAND_SENDED: IConfigInfoModal,
   LOAN_RESA_CHANGE_VALIDATED: IConfigInfoModal,
   LOAN_DEMAND_VALIDATED: IConfigInfoModal
} 



/**
 * Info Modal Config Preset
 */
export const infoModalConfigPreset : InfoModalPreset = 
{
    PASSWORD_OR_ID_NOT_PROVIDED: {
        title: 'Mot passe ou email invalide',
        message: 'Veuillez saisir votre email et votre mot de passe',
        iconType: 'bad'
    },
    BAD_PASSWORD_OR_ID: {
        title: 'Mot passe ou email invalide',
        message: 'Veuillez vérifier votre email et votre mot de passe svp',
        iconType: 'bad'
    },
    NETWORK_PB:{
        title: 'Erreur Reseau',
        message: 'Veuillez verifier votre connexion internet',
        iconType: 'bad'
    },
    INTERN_ERROR:{
        title: 'Erreur Interne',
        message: 'Désolé veuillez réssayer ulterieurement',
        iconType: 'bad'
    },
    SESSION_ENDED:{
        title: 'Session expirée',
        message: 'Désolé votre session a expirée, veuillez vous reconnecter',
        iconType: 'bad'
    },

    FORM_NOT_VALID: {
        title: 'Fourmulaire invalide',
        message: 'Veuillez verifier que les champs obligatoires aient bien une valeur valide svp',
        iconType: 'bad'
    },
    
    NEW_SPENDING_DEMAND_SENDED: {
        title: 'Votre demande de dépense a été envoyée',
        message: '',
        iconType: 'good'
    },

    NEW_LOAN_DEMAND_SENDED: {
        title: "Votre demande d'emprunt a été envoyée",
        message: '',
        iconType: 'good'
    },

    IS_SENDING_LOADER: {
        title: 'Envoi en cours',
        message: 'Veuillez patienter svp',
        iconType:'sending',
        noBtnClose: true,
    },

    CHANGE_VALIDATED:{
        title: 'Changement Validé',
        iconType:'good',
    },


    LOAN_RESA_CHANGE_VALIDATED:{
        title: 'Changement Accepté',
        iconType:'good',
    },

    LOADER:{
        message: 'Veuillez patienter',
        loaderMode: true
    },

    LOAN_DEMAND_VALIDATED:{
        title: "Votre demande d'emprunt est validée",
        message: "Vous serez averti lorsqu'elle prête",
        iconType: 'good'
    },
}