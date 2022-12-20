import { GetServerSideProps } from 'next';
import { Error } from '../../components/Error/Error';
import PasteComponent from '../../components/Paste/Paste';
import { getLatestPastes, getPaste } from '../../data/paste.api';
import { APIError } from '../../utils/APIError';
import { PasteValue } from '../../utils/types';

export default function Paste({
  error,
  data,
  pastes,
}: {
  error: APIError | null;
  data: PasteValue | null;
  pastes: PasteValue[] | null;
}) {
  if (error) {
    return <Error errorCode={error.status} errorTitle={error.title} errorText={error.message} />;
  }

  return <PasteComponent paste={data || undefined} latestPastes={pastes || []} />;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { data: pastes } = await getLatestPastes();
  const { data, error } = await getPaste((params && (params.slug as string)) || '');

  if (error) {
    return {
      props: {
        error,
        data: null,
        pastes,
      },
    };
  }

  return {
    props: {
      data,
      error: null,
      pastes,
    },
  };
};
