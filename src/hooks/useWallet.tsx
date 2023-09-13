import { useCallback, useEffect } from 'react';
import { useModal } from 'react-modal-hook';
import { useDispatch, useSelector } from 'react-redux';
import { Notification } from 'components';
import { metamaskSelectors } from 'store/metamask/selectors';
import { metamaskConnect, metamaskDisconnect } from 'store/metamask/actionCreators';
import { Network } from 'appConstants';
import { MetamaskStatus } from 'types';

export const useWallet = () => {
  const dispatch = useDispatch();

  const address = useSelector(metamaskSelectors.getProp('address'));
  const status = useSelector(metamaskSelectors.getProp('status'));
  const isLostWallet = useSelector(metamaskSelectors.getProp('isLostWallet'));

  const [showNetworkNotFound, hideNetworkNotFound] = useModal(
    () => <Notification onCloseModal={hideNetworkNotFound} />,
    [],
  );

  const onConnectWallet = useCallback(() => {
    dispatch(metamaskConnect({
      network: Network.MaticTest,
      callbackNotFoundNetwork: showNetworkNotFound,
    }));
  }, [dispatch, showNetworkNotFound]);

  const onDisconnectWallet = useCallback(() => {
    dispatch(metamaskDisconnect({
      status: MetamaskStatus.LOST,
    }));
  }, [dispatch]);
  
  const isConnected = status === MetamaskStatus.CONNECTED;
  
  useEffect(() => {
    if (status === MetamaskStatus.INIT && !isLostWallet) {
      dispatch(metamaskConnect({
        network: Network.MaticTest,
        callbackNotFoundNetwork: showNetworkNotFound,
      }));
    }
  }, [dispatch, isLostWallet, showNetworkNotFound, status]);

  return {
    isConnected,
    address,
    onConnectWallet,
    onDisconnectWallet,
  };
};
