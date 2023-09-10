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

                #in_common = 0
            
                #for index in (0...common)
                #    in_common += 1
                #end
                
                #if in_common > 0
                #    table_builder[
                #end

                #if is_eq and other_doc.data['pagelinkshortname']
                    #current_page.content << other_doc.data['pagelinkshortname']
                    
                #    if my_tags.length() >= 2 
                        
                #    end
                #end
            end
            
            headers = []
            values = []
            
            table_builder.each{ |k, v| headers.append(k)}
            
            if headers.length() == 0
                next
            end
            
            #puts(headers)
            #puts(values)
            
            headers.each do |h| 
                local_values = table_builder[h]
                
                local_values.each do |v|
                    values.append(v)
                end
            end
            
            current_page.content << "\n| Test | \n | ---- | \n | Hello |\n\n"
            
            current_page.content << "\n| "
            
            headers.each do |h| 
                current_page.content << h
                current_page.content << ' | '
            end
            
            current_page.content << "\n| "
            
            headers.each do |h| 
                current_page.content << "-------- | "
            end
            
            current_page.content << "\n| "
            
            wrap = 0
            
            values.each do |v|
                current_page.content << v
                current_page.content << " | "
                
                puts(wrap)
            
                wrap += 1
                
                if wrap > 0 and (wrap % headers.length()) == 0
                    puts("wrapping")
                
                    if wrap != values.length()
                        current_page.content << "\n| "
                    else
                        current_page.content << "\n"
                    end
                end
            end
            
            puts(current_page.content)
            
            #puts(table_builder)
        end
    end
end