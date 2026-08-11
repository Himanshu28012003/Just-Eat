import {
    ArrowRight,
} from "lucide-react";

import {
    Link,
} from "react-router-dom";

import DiscoveryCard from "./DiscoveryCard";

const DiscoverySection = ({
    title,
    subtitle,
    items,
    type,
}) => {

    if (!items || items.length === 0) {
        return null;
    }


    return (

        <section className="mt-12">

            {/* Header */}

            <div className="mb-6 flex items-end justify-between">

                <div>

                    <h2 className="text-2xl font-bold text-gray-900">
                        {title}
                    </h2>

                    {subtitle && (
                        <p className="mt-1 text-sm text-gray-500">
                            {subtitle}
                        </p>
                    )}

                </div>


                <Link
                    to="/restaurants"
                    className="hidden items-center gap-1 text-sm font-semibold text-orange-500 sm:flex"
                >
                    View all
                    <ArrowRight size={16} />
                </Link>

            </div>


            {/* Cards */}

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {items
                    .slice(0, 6)
                    .map((item) => (

                        <DiscoveryCard
                            key={`${type}-${item.menuItemId || item.id}`}
                            item={item}
                            type={type}
                        />

                    ))}

            </div>

        </section>
    );
};

export default DiscoverySection;