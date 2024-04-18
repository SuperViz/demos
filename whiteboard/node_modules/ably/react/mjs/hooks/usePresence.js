var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { channelOptionsWithAgent } from '../AblyReactHooks.js';
import { useAbly } from './useAbly.js';
import { useStateErrors } from './useStateErrors.js';
const INACTIVE_CONNECTION_STATES = ['suspended', 'closing', 'closed', 'failed'];
export function usePresence(channelNameOrNameAndOptions, messageOrPresenceObject, onPresenceUpdated) {
    const params = typeof channelNameOrNameAndOptions === 'object'
        ? channelNameOrNameAndOptions
        : { channelName: channelNameOrNameAndOptions };
    const ably = useAbly(params.id);
    const subscribeOnly = typeof channelNameOrNameAndOptions === 'string' ? false : params.subscribeOnly;
    const channelOptions = params.options;
    const channelOptionsRef = useRef(channelOptions);
    const channel = useMemo(() => ably.channels.get(params.channelName, channelOptionsWithAgent(channelOptionsRef.current)), [ably, params.channelName]);
    const skip = params.skip;
    const { connectionError, channelError } = useStateErrors(params);
    useEffect(() => {
        if (channelOptionsRef.current !== channelOptions && channelOptions) {
            channel.setOptions(channelOptionsWithAgent(channelOptions));
        }
        channelOptionsRef.current = channelOptions;
    }, [channel, channelOptions]);
    const [presenceData, updatePresenceData] = useState([]);
    const updatePresence = (message) => __awaiter(this, void 0, void 0, function* () {
        const snapshot = yield channel.presence.get();
        updatePresenceData(snapshot);
        onPresenceUpdated === null || onPresenceUpdated === void 0 ? void 0 : onPresenceUpdated.call(this, message);
    });
    const onMount = () => __awaiter(this, void 0, void 0, function* () {
        channel.presence.subscribe('enter', updatePresence);
        channel.presence.subscribe('leave', updatePresence);
        channel.presence.subscribe('update', updatePresence);
        if (!subscribeOnly) {
            yield channel.presence.enter(messageOrPresenceObject);
        }
        const snapshot = yield channel.presence.get();
        updatePresenceData(snapshot);
    });
    const onUnmount = () => {
        // if connection is in one of inactive states, leave call will produce exception
        if (channel.state === 'attached' && !INACTIVE_CONNECTION_STATES.includes(ably.connection.state)) {
            if (!subscribeOnly) {
                channel.presence.leave();
            }
        }
        channel.presence.unsubscribe('enter', updatePresence);
        channel.presence.unsubscribe('leave', updatePresence);
        channel.presence.unsubscribe('update', updatePresence);
    };
    const useEffectHook = () => {
        !skip && onMount();
        return () => {
            onUnmount();
        };
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(useEffectHook, [skip]);
    const updateStatus = useCallback((messageOrPresenceObject) => {
        if (!subscribeOnly) {
            channel.presence.update(messageOrPresenceObject);
        }
        else {
            throw new Error('updateStatus can not be called while using the hook in subscribeOnly mode');
        }
    }, [subscribeOnly, channel]);
    return { presenceData, updateStatus, connectionError, channelError };
}
//# sourceMappingURL=usePresence.js.map