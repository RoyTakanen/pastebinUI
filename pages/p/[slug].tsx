import { useRouter } from 'next/router';

import { Error } from '../../components/Error/Error';
import PasteComponent from '../../components/Paste/Paste';
import { useGetPaste } from '../../data/paste.api';

export default function Paste() {
  const router = useRouter();

  const { data: paste, error, isValidating } = useGetPaste(router.query.slug as string);

  // const author = {
  //   name: 'tuntematon',
  //   avatar:
  //     'https://images.unsplash.com/photo-1534294668821-28a3054f4256?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
  // };

  if (error) {
    return <Error errorCode={error.status} errorTitle={error.title} errorText={error.message} />;
  }

  return <PasteComponent paste={paste} loading={isValidating && !paste} />;
}
