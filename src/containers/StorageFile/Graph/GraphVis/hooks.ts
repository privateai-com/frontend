import styles from './styles.module.scss';

type ApdateGraphControlsProps =
  React.RefObject<HTMLDivElement>;

export const apdateGraphControls = (ref: ApdateGraphControlsProps) => {
  if (ref.current) {
    const { children } = ref.current;
    const visNetwork = children[0];
    const editModeElement = children[0].getElementsByClassName('vis-edit-mode')[0];
    const manipulationElement = children[0].getElementsByClassName('vis-manipulation')[0];
    // const closeButton = children[0].getElementsByClassName('vis-close')[0];
    // const navigation = children[0].getElementsByClassName('vis-navigation')[0];
    // const navUp = navigation.getElementsByClassName('vis-button vis-up')[0];
    // const navRight = navigation.getElementsByClassName('vis-button vis-right')[0];
    // const navBottom = navigation.getElementsByClassName('vis-button vis-down')[0];
    // const navLeft = navigation.getElementsByClassName('vis-button vis-left')[0];
    
    if (visNetwork) visNetwork.classList.add(styles.visNetwork);
    if (manipulationElement) manipulationElement.classList.add(styles.visManipulation);
    if (editModeElement) editModeElement.classList.add(styles.visEditMode);
    // if (navUp) navUp.classList.add(styles.hide);
    // if (navRight) navRight.classList.add(styles.hide);
    // if (navBottom) navBottom.classList.add(styles.hide);
    // if (navLeft) navLeft.classList.add(styles.hide);
    // if (closeButton) closeButton.classList.add(styles.hide);
  }
};
