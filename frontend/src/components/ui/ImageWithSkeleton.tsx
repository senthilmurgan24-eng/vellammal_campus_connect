import { memo, useEffect, useState } from 'react';
import clsx from 'clsx';
import Skeleton from './Skeleton';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  skeletonClassName?: string;
}

const ImageWithSkeleton = memo(({ skeletonClassName, className, ...rest }: Props) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [rest.src]);

  return (
    <div className={clsx('relative overflow-hidden', skeletonClassName)}>
      {!loaded && <Skeleton className="absolute inset-0" />}
      <img
        {...rest}
        className={clsx('block w-full h-full object-cover transition-opacity duration-300', className, {
          'opacity-0': !loaded,
          'opacity-100': loaded
        })}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
});

export default ImageWithSkeleton;
