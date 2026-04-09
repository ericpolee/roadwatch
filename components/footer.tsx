export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-6 h-6 text-primary-foreground"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-2xl font-bold">RoadWatch</span>
          </div>

          <p className="text-secondary-foreground/80 text-center md:text-left">
            Driving toward safer roads for everyone.
          </p>

          <p className="text-sm text-secondary-foreground/60">© 2025 RoadWatch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
