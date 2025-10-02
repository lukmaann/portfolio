import { GENERAL_INFO, SOCIAL_LINKS } from '@/lib/data';

const Footer = () => {
    return (
        <footer
            id="contact"
            className="relative bg-black text-white h-screen flex flex-col justify-between items-center px-6"
        >
            {/* Top Links (like Banner) */}
            {/* <div className="absolute top-6 left-6 text-xs md:text-sm underline">
                <a href={`mailto:${GENERAL_INFO.email}`}>{GENERAL_INFO.email}</a>
            </div>
            <div className="absolute top-6 right-6 text-xs md:text-sm underline">
                <a
                    href="https://linkedin.com/in/lukmaan"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    LINKEDIN.COM/IN/LUKMAAN
                </a>
            </div> */}

            {/* Center CTA */}
            <div className="flex flex-col items-center justify-center h-full text-center">
                <h2 className="font-anton text-4xl md:text-7xl uppercase leading-tight">
                    Let’s Build Something Together
                </h2>
                <a
                    href={`mailto:${GENERAL_INFO.email}`}
                    className="mt-8 px-10 py-4 font-anton text-lg md:text-2xl uppercase border-2 border-white bg-white text-black hover:bg-black hover:text-white transition-colors duration-300"
                >
                    Get In Touch
                </a>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-6 left-6 text-xs md:text-sm text-neutral-400">
                {new Date().getFullYear()} © Lukmaan Nadaf
            </div>
            <div className="absolute bottom-6 right-6 flex gap-6 text-xs md:text-sm text-neutral-400">
                {SOCIAL_LINKS.map((link) => (
                    <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="uppercase hover:text-primary transition-colors"
                    >
                        {link.name}
                    </a>
                ))}
            </div>
        </footer>
    );
};

export default Footer;
