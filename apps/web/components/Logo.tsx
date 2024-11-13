export const Logo = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="200"
      height="200"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 30
             C140 30, 170 60, 170 100
             C170 140, 140 170, 100 170
             C60 170, 30 140, 30 100
             C30 60, 60 30, 100 30
             Z
             M100 70
             C120 70, 130 80, 130 100
             C130 120, 120 130, 100 130
             C80 130, 70 120, 70 100
             C70 80, 80 70, 100 70
             Z"
        fill="#2D3436"
        fillRule="evenodd"
      />
    </svg>
  );
};
