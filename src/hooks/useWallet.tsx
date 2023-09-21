import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { metamaskSelectors } from 'store/metamask/selectors';
import { metamaskConnect, metamaskDisconnect } from 'store/metamask/actionCreators';
import { Network } from 'appConstants';
import { MetamaskStatus } from 'types';

export const useWallet = () => {
  const dispatch = useDispatch();

  const address = useSelector(metamaskSelectors.getProp('address'));
  const status = useSelector(metamaskSelectors.getProp('status'));

  const onConnectWallet = useCallback(() => {
    dispatch(metamaskConnect({
      network: Network.MaticTest,
    }));
  }, [dispatch]);

  const onDisconnectWallet = useCallback(() => {
    dispatch(metamaskDisconnect({
      status: MetamaskStatus.LOST,
    }));
  }, [dispatch]);
  
  const isConnected = status === MetamaskStatus.CONNECTED;

  return {
    isConnected,
    address,
    onConnectWallet,
    onDisconnectWallet,
  };
};
