export function TableSkeleton(){
    return(
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 animate-pulse">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
                <i className="block bg-gray-200 w-full h-5 rounded-full"></i>
            </th>
            <th scope="col" className="px-6 py-3">
                <i className="block bg-gray-200 w-full h-5 rounded-full"></i>
            </th>
            <th scope="col" className="px-6 py-3">
                <i className="block bg-gray-200 w-full h-5 rounded-full"></i>
            </th>
            <th scope="col" className="px-6 py-3">
                <i className="block bg-gray-200 w-full h-5 rounded-full"></i>
            </th>
            <th scope="col" className="px-6 py-3">
                <i className="block bg-gray-200 w-full h-5 rounded-full"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          <TableSkeletonItem/>
          <TableSkeletonItem/>
          <TableSkeletonItem/>
          <TableSkeletonItem/>
          <TableSkeletonItem/>
          <TableSkeletonItem/>
          <TableSkeletonItem/>
          <TableSkeletonItem/>
          <TableSkeletonItem/>
          <TableSkeletonItem/>
        </tbody>
      </table>
    );
}

export function TableSkeletonItem(){
    return(
        <tr className="bg-white border-bhover:bg-gray-50">
            <td className="w-4 p-4 text-center">
                <i className="block bg-gray-200 w-full h-5 rounded-full"></i>
            </td>
            <td className="px-6 py-4">
                <i className="block bg-gray-200 w-10 h-10 rounded-full"></i>
            </td>
            <td className="px-6 py-4">
                <i className="block bg-gray-200 w-full h-5 rounded-full"></i>
            </td>
            <td className="px-6 py-4">
                <i className="block bg-gray-200 w-full h-5 rounded-full"></i>
            </td>
            <td className="px-6 py-4">
                <i className="block bg-gray-200 w-full h-5 rounded-full"></i>
            </td>
        </tr>
    );
}