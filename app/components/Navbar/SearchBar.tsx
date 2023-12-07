import {useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {categories} from "@/app/components/Navbar/Categories";
import qs from "query-string";
import {Dropdown} from "flowbite-react";
import {FaAngleDown} from "react-icons/fa";

const SearchBar = () => {
    const router = useRouter();
    const params = useSearchParams();
    const pathname = usePathname();

    const [search, setSearch] = useState<
        { category: string, title: string }
    >({
        category: params?.get('category') || '',
        title: ''
    });

    const handleSearch = () => {
        const url = qs.stringifyUrl(
            {
                url: '/',
                query: {
                    category: search.category,
                    title: search.title
                },
            },
            {skipNull: true}
        );

        router.push(url);
    }

    if (pathname !== '/') {
        return null;
    }

    return (
        <>
            <div className="flex md:w-[calc(100%-40rem)]">
                <Dropdown label={''} className={'border border-gray-300 rounded-s-lg'} inline renderTrigger={() => (
                    <button className="inline-flex w-auto items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-200">
                        {search.category || 'Categories'}
                        <FaAngleDown/>
                    </button>
                )}>
                    <Dropdown.Item onClick={() => {setSearch({...search, category: ''})}}>
                        All Categories
                    </Dropdown.Item>
                    {categories.map((category) => (
                        <Dropdown.Item
                            key={category.label}
                            onClick={() => {setSearch({...search, category: category.label})}}
                        >
                            <span className={'me-2'}>
                                <category.icon size={17}/>
                            </span>
                            {category.label}
                        </Dropdown.Item>
                    ))}
                </Dropdown>
                <div className="relative w-full">
                    <input onChange={(e) => setSearch({...search, title: e.target.value})}
                           type="search"
                           id="search-dropdown"
                           className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                           placeholder="Search Houses"
                    />
                    <button onClick={handleSearch}
                            type="button"
                            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-orange-400 rounded-e-lg border border-orange-700 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                    >
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                </div>
            </div>
        </>
    );
}

export default SearchBar;
