import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import { motion } from "framer-motion";
import { AlignRight, X } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { StyledIconButton, StyledLinkButton } from "@/components/button";
import API_URLS from "@/api-urls";

const links = [
  {
    url: "/",
    label: "Home",
  },

  {
    url: "https://defi.libre.org/",
    label: "DeFi",
    badge: "new",
  },
  {
    url: "https://beta.libredex.org/",
    label: "LibreDex",
    badge: "Beta",
  },
  {
    url: "/generate",
    label: "Generate",
  },
  {
    url: "/validators",
    label: "Validators",
  },
  {
    url: "/tokens",
    label: "Tokens",
  },
];

export default function Header() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const dynamicRoute = router.asPath;
  const [selectedApiUrl, setSelectedApiUrl] = useLocalStorage(
    "apiUrl",
    API_URLS.find((k) => k.default)?.url
  );
  const providerName = process.env.NEXT_PUBLIC_PROVIDER_NAME;

  React.useEffect(() => {
    // close menu on page change
    setOpen(() => false);
  }, [dynamicRoute]);

  return (
    <>
      <header className="border-b border-line">
        <div className="container">
          <div className="flex h-24 items-center justify-between space-x-3">
            <Link href="/" className="lg:shrink-0">
              <img
                src="/images/logo.svg"
                alt="Logo"
                width={270}
                height={41}
                className="mb-2 h-8 object-contain object-left lg:h-auto"
              />
              <span className="flex text-sm md:justify-end">
                Data Provider: {providerName}
              </span>
            </Link>

            <div className="hidden h-full items-center space-x-5 lg:flex">
              {links.map((item, i) => (
                <Link
                  key={i}
                  href={item.url}
                  className={clsx(
                    "flex items-center border-b-3  font-medium tracking-wide hover:text-primary",
                    {
                      "border-primary text-primary":
                        router.pathname === item.url,
                      "border-transparent text-white":
                        router.pathname !== item.url,
                    }
                  )}
                >
                  {item.label}
                  {item.badge && (
                    <span className="relative ml-1 rounded bg-primary px-1 py-1 text-xs text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button
                    className="text-md rounded-full  px-3 py-2 text-white outline-none ring-1 ring-white/20 transition hover:bg-white/10"
                    suppressHydrationWarning
                  >
                    {
                      API_URLS.find((apiUrl) => apiUrl.url === selectedApiUrl)
                        ?.label
                    }
                  </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="w-40 rounded-md bg-black/90 py-1 text-white ring-1 ring-white/20 animate-in fade-in-20"
                    sideOffset={5}
                    align="end"
                  >
                    {API_URLS.map((apiUrl) => (
                      <DropdownMenu.Item asChild key={apiUrl.key}>
                        <button
                          onClick={() => {
                            setSelectedApiUrl(apiUrl.url);
                            setTimeout(() => {
                              window.location.reload();
                            }, 150);
                          }}
                          className="flex w-full items-center justify-between space-x-3 px-4 py-1 text-left text-sm outline-none transition hover:bg-white/10"
                        >
                          <span>{apiUrl.label}</span>
                          {apiUrl.url === selectedApiUrl && (
                            <span className="block h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
                          )}
                        </button>
                      </DropdownMenu.Item>
                    ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>

            <div className="flex items-center space-x-2.5 lg:hidden">
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button
                    className="rounded-full px-3 py-2 text-xs font-medium text-white outline-none ring-1 ring-white/20 transition hover:bg-white/10"
                    suppressHydrationWarning
                  >
                    {
                      API_URLS.find((apiUrl) => apiUrl.url === selectedApiUrl)
                        ?.label
                    }
                  </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="w-40 rounded-md bg-black/90 py-1 text-white ring-1 ring-white/20 animate-in fade-in-20"
                    sideOffset={5}
                    align="end"
                  >
                    {API_URLS.map((apiUrl) => (
                      <DropdownMenu.Item asChild key={apiUrl.key}>
                        <button
                          onClick={() => {
                            setSelectedApiUrl(apiUrl.url);
                            setTimeout(() => {
                              window.location.reload();
                            }, 150);
                          }}
                          className="flex w-full items-center justify-between space-x-3 px-4 py-1 text-left text-sm outline-none transition hover:bg-white/10"
                        >
                          <span>{apiUrl.label}</span>
                          {apiUrl.url === selectedApiUrl && (
                            <span className="block h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
                          )}
                        </button>
                      </DropdownMenu.Item>
                    ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>

              <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Trigger asChild>
                  <StyledIconButton aria-label="Open Menu">
                    <AlignRight className="h-6 w-6 text-white" />
                  </StyledIconButton>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Content className="fixed inset-0 z-50 bg-black bg-opacity-90 px-3 backdrop-blur-sm">
                    <div className="flex h-18 items-center justify-between">
                      <Link href="/" className="shrink-0">
                        <img
                          src="/images/logo.svg"
                          alt="Logo"
                          width={208}
                          height={41}
                        />
                      </Link>
                      <Dialog.Close asChild>
                        <StyledIconButton aria-label="Close Menu">
                          <X className="h-6 w-6 text-white" />
                        </StyledIconButton>
                      </Dialog.Close>
                    </div>
                    <div>
                      {links.map((item, i) => (
                        <StyledLinkButton
                          LinkComponent={Link}
                          key={i}
                          href={item.url}
                        >
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            className={clsx(
                              "block w-full p-3 text-right text-base font-medium tracking-wide",
                              {
                                "text-primary": router.pathname === item.url,
                                "text-white": router.pathname !== item.url,
                              }
                            )}
                          >
                            {item.label}
                            {item.badge && (
                              <span className="relative ml-1 rounded bg-primary px-1 py-1 text-xs text-white">
                                New
                              </span>
                            )}
                          </motion.span>
                        </StyledLinkButton>
                      ))}
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
