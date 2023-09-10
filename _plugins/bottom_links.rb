# frozen_string_literal: true
class BottomLinks < Jekyll::Generator
    priority :highest

    def gen_table(table_name, all_docs)
        table_builder = {}

        all_docs.each do |other_doc|
            if other_doc.data["layout"] != "page"
                next
            end

            their_tags = other_doc.data['tags'] || []

            if their_tags.length() == 0
                next
            end

            if table_name != their_tags[0]
                next
            end

            if their_tags[1] == nil
                next
            end

            if table_builder[their_tags[1]] == nil
                table_builder[their_tags[1]] = []
            end

            table_builder[their_tags[1]].append(other_doc.data['pagelinkshortname'])
        end

        return table_builder
    end

    def table_to_string(table_builder)
        headers = []
        values = []

        table_builder.each do |k,v|
            headers.append(k)
        end
        
        if headers.length() == 0
            return ""
        end

        value_max = 0

        headers.each do |h|
            local_values = table_builder[h]
            value_max = [value_max, table_builder[h].length()].max

            local_values.each do |v|
                values.append(v)
            end
        end

        str = "| #{headers.join(' | ')} |\n"

        str << "| "

        headers.each do |h|
            str << "------ | "
        end

        str << "\n"

        for index in (0...value_max)
            to_join = []

            headers.each do |h|
                to_join.append(table_builder[h][index] != nil ? "[[#{table_builder[h][index]}]]" : "")
            end

            str << "| "
            str << to_join.join(" | ")
            str << " |\n"
        end

        return str
    end

    def append_table(page, table_as_string)
        page.content << "\n\nSee Also:\n\n"

        page.content << table_as_string
    end

    def generate(site)
        all_pages = site.pages
        all_posts = site.posts.docs

        all_docs = all_pages + all_posts

        all_built_tables = {}

        all_docs.each do |current_page|
            if current_page.data["layout"] != "page"
                next
            end

            tags = current_page.data['tags'] || []

            if tags.length() == 0
                next
            end

            if all_built_tables[tags[0]] != nil
                next
            end

            as_builder = gen_table(tags[0], all_docs)
            all_built_tables[tags[0]] = as_builder
        end

        all_docs.each do |current_page|
            if current_page.data["layout"] != "page"
                next
            end

            all_built_tables.each do |k,v|
                current_page.content = current_page.content.gsub(/\?\?#{k}\?\?/, table_to_string(v))
            end
        end

        all_docs.each do |current_page|
            if current_page.data["layout"] != "page"
                next
            end

            tags = current_page.data['tags'] || []

            if tags.length() == 0
                next
            end

            table_builder = all_built_tables[tags[0]]

            table_as_string = table_to_string(table_builder)

            append_table(current_page, table_as_string)
        end
    end
end