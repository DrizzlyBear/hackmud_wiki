# frozen_string_literal: true
class BottomLinks < Jekyll::Generator
    def generate(site)
        all_pages = site.pages
        all_posts = site.posts.docs

        all_docs = all_pages + all_posts

        link_extension = !!site.config["use_html_extension"] ? '.html' : ''

        all_docs.each do |current_page|
            if current_page.data["layout"] != "page"
                next
            end

            table_builder = {}

            my_tags = current_page.data['tags'] || []

            if my_tags.length() == 0
                next
            end

            all_docs.each do |other_doc|
                if other_doc.data["layout"] != "page"
                    next
                end

                their_tags = other_doc.data['tags'] || []

                if their_tags.length() == 0
                    next
                end

                if my_tags[0] != their_tags[0]
                    next
                end

                if table_builder[their_tags[1]] == nil
                    table_builder[their_tags[1]] = []
                end

                table_builder[their_tags[1]].append(other_doc.data['pagelinkshortname'])
            end

            headers = []
            values = []

            table_builder.each{ |k, v| headers.append(k)}

            if headers.length() == 0
                next
            end

            value_max = 0

            headers.each do |h|
                local_values = table_builder[h]
                value_max = [value_max, table_builder[h].length()].max

                local_values.each do |v|
                    values.append(v)
                end
            end

            current_page.content << "\n\nSee Also:"

            current_page.content << "\n\n| "
            current_page.content << headers.join(' | ')
            current_page.content << " |\n"

            for index in (0...value_max)
                to_join = []

                headers.each do |h|
                    to_join.append(table_builder[h][index] != nil ? "[[#{table_builder[h][index]}]]" : "")
                end

                current_page.content << "| "
                current_page.content << to_join.join(" | ")
                current_page.content << " |\n"
            end
        end
    end
end