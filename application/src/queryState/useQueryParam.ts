import { useUrlSearchParams } from '@vueuse/core';
import {Ref, ref} from 'vue'

type UseQueryParam = (param: string) => Ref<string>;
const useQueryParam: UseQueryParam = (param) => {
    const params = useUrlSearchParams('history')
    const retParam = ref(params[param] as string)

    let previousUrl = '';
    const observer = new MutationObserver(function () {
        if (window.location.href !== previousUrl) {
            previousUrl = window.location.href;
            const newParams = useUrlSearchParams('history')
            retParam.value = newParams[param] as string
        }
    });
    const config = { subtree: true, childList: true };
    observer.observe(document, config);

    return retParam
}

export default useQueryParam
