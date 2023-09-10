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
    
    def append_table(page, table_builder)
        headers = []
        values = []

        table_builder.each{|k, v| headers.append(k)}

        if headers.length() == 0
            return
        end

        value_max = 0

        headers.each do |h|
            local_values = table_builder[h]
            value_max = [value_max, table_builder[h].length()].max

            local_values.each do |v|
                values.append(v)
            end
        end

        page.content << "\n\nSee Also:"

        page.content << "\n\n| "
        page.content << headers.join(' | ')
        page.content << " |\n"

        page.content << "| "

        headers.each do |h|
            page.content << "------ | "
        end

        page.content << "\n"

        for index in (0...value_max)
            to_join = []

            headers.each do |h|
                to_join.append(table_builder[h][index] != nil ? "[[#{table_builder[h][index]}]]" : "")
            end

            page.content << "| "
            page.content << to_join.join(" | ")
            page.content << " |\n"
        end
    end
    
    def generate(site)
        all_pages = site.pages
        all_posts = site.posts.docs

        all_docs = all_pages + all_posts

        all_docs.each do |current_page|
            if current_page.data["layout"] != "page"
                next
            end

            my_tags = current_page.data['tags'] || []

            if my_tags.length() == 0
                next
            end

            table_builder = gen_table(my_tags[0], all_docs)
            
            append_table(current_page, table_builder)
        end
    end
end