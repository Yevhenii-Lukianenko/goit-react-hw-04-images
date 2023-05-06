import { ThreeDots } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div
      style={{
        margin: '0 auto',
      }}
    >
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        display="block"
        margin="0 auto"
        color="#3f51b5"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};
