import React from "react";
import ContentLoader from "react-content-loader";
const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="81" y="28" rx="0" ry="0" width="1" height="19" />
    <rect x="0" y="296" rx="15" ry="15" width="280" height="30" />
    <rect x="89" y="116" rx="0" ry="0" width="3" height="2" />
    <rect x="111" y="128" rx="0" ry="0" width="0" height="1" />
    <rect x="110" y="95" rx="0" ry="0" width="1" height="1" />
    <circle cx="136" cy="136" r="136" />
    <rect x="0" y="350" rx="10" ry="10" width="280" height="88" />
    <rect x="-2" y="464" rx="10" ry="10" width="95" height="30" />
    <rect x="127" y="450" rx="24" ry="24" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
