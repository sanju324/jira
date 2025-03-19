import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import UserMenu from "./user-menu";
import { checkUser } from "@/lib/checkUser";
import UserLoading from "./user-loading";

const Header = async () => {
	await checkUser();

	return (
		<header className="bg-slate-50 shadow-md">
			<nav className="py-6 px-4 flex justify-between items-center">
				<Link href="/">
					<Image
						src={"/logo2.png"}
						alt="Zscrum Logo"
						width={200}
						height={56}
					/>
				</Link>
				<div className="flex items-center gap-4">
					<Link href="/project/create">
						<Button variant="destructive">
							<span>Create Project</span>
						</Button>
					</Link>

					<SignedOut>
						<SignInButton forceRedirectUrl="/onboarding">
							<Button variant="outline">Login</Button>
						</SignInButton>
					</SignedOut>
					<SignedIn>
						<UserMenu />
					</SignedIn>
				</div>
			</nav>
			<UserLoading />
		</header>
	);
};

export default Header;
