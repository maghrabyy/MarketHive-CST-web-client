import { Link } from 'react-router-dom';

export const HomeSection = ({
  title,
  className,
  pathTitle,
  sectionPath,
  children,
}) => {
  return (
    <div className={`homepage-section pt-20 pb-4 space-y-10 ${className}`}>
      <div className="section-title flex justify-between">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Link
          to={sectionPath}
          className="text-gray-500 hover:text-gray-400 place-self-end"
        >
          View {pathTitle}
        </Link>
      </div>
      <div className="collection-list media">{children}</div>
    </div>
  );
};
