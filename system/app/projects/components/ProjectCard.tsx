import Image from 'next/image';

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    shortDescription: string;
    techStack: string[];
    image: string[];
  };
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  // Get first valid image or use placeholder
  const validImages = project.image.filter((img) => img && img.trim() !== '');
  const thumbnailImage = validImages.length > 0 ? validImages[0] : null;

  return (
    <button
      onClick={onClick}
      className="project-card w-full h-full text-left border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-shakespeare-700 hover:shadow-xl hover:shadow-shakespeare-900/20 group flex flex-col"
    >
      {/* Image - fixed at top with no gap */}
      <div className="project-card-image aspect-video relative">
        {thumbnailImage ? (
          <Image
            src={thumbnailImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-shakespeare-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-shakespeare-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-text-secondary text-sm mb-4 line-clamp-2">
          {project.shortDescription}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((tech, index) => (
            <span key={index} className="tech-pill">
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="tech-pill">+{project.techStack.length - 4}</span>
          )}
        </div>
      </div>
    </button>
  );
}
