export function UserItem({ name, image, status, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex gap-3 items-center group w-full transition-all duration-200"
    >
      <div
        className="w-[40px] h-[40px] rounded-full shadow-md overflow-hidden
        group-hover:shadow-lg transition-all duration-300 relative
        before:absolute before:inset-0 before:bg-gradient-to-tr before:from-blue-500/20 before:to-purple-500/30 before:opacity-0
        group-hover:before:opacity-100 before:transition-opacity before:duration-300"
      >
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-medium">
            {name.charAt(0)}
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center">
        <h3 className="font-medium text-inherit transition-all duration-200 group-hover:translate-x-0.5">
          {name}
        </h3>
        {status && (
          <span
            className="block text-xs text-gray-500 dark:text-gray-400 group-hover:opacity-100 
            transition-all duration-300 transform group-hover:translate-y-0"
          >
            {status}
          </span>
        )}
      </div>
    </div>
  );
}
