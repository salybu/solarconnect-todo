import React from 'react';
import styled from 'styled-components';

const NoData = styled.div`
  text-align: center;
  padding: 30px;
  font-size: 20px;
`;

const Nodata = () => {
  return <NoData>No data</NoData>;
};

export default React.memo(Nodata);
