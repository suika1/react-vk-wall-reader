import React from 'react';
import PropTypes from 'prop-types'

export class Entry extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isShowingAttachments: false,
        }
    }

    toggleAttachments = () => {
        this.setState({isShowingAttachments: !this.state.isShowingAttachments});
    };

    //render all attachments if button toggled
    renderAttachments = (attachments) => {
        const { openModal } = this.props;
        if (this.state.isShowingAttachments) {
            if (!attachments) {
                return (<p>Вложения отсутствуют</p>);
            }
            let attByTypes = new Map();

            //adding all attachments by types (to render them together in 1 block)
            attachments.forEach(a => {
                if (attByTypes.get(a.type)) {
                    attByTypes.set(a.type, attByTypes.get(a.type).concat(a));
                } else {
                    attByTypes.set(a.type, [a]);    //setting initial arrays for each type of attachments
                }
            });

            let ans = [];  //answer(contains all attachments)
            let keyHead= -1;
            attachments.forEach((item, index) => {
                //If this attachment is first of it's type - render header for type
               if (attByTypes.get(item.type) && item === attByTypes.get(item.type)[0]) {
                   switch(item.type){
                       case 'photo':
                           ans = ans.concat(<p key={keyHead--}>Фото:</p>);
                           break;
                       case 'link':
                           ans = ans.concat(<p key={keyHead--}>Ссылки:</p>);
                           break;
                       case 'video':
                           ans = ans.concat(<p key={keyHead--}>Видео: <span>(нажмите на картинку, чтобы открыть видео)</span></p>);
                           break;
                       case 'doc':
                           ans = ans.concat(<p key={keyHead--}>Документы:</p>);
                           break;
                       case 'poll':
                           ans = ans.concat(<p key={keyHead--}>Опросы:</p>);
                           break;
                       case 'audio':
                           ans = ans.concat(<p key={keyHead--}>Аудио:</p>);
                           break;
                       default:
                           ans = ans.concat(<p key={keyHead--}>{item.type}:</p>);
                           break;
                   }
               }

               //render attachment depending on it's type
                switch(item.type){
                    case 'photo':
                        ans = ans.concat(
                            <div key={index} className='att-photo'>
                                <div
                                    className='no-repeat-contain-img'
                                    style={{backgroundImage: `url(${item.photo.sizes[3].url})`}}
                                    onClick={() => openModal(item.photo.sizes[3].url)}
                                />
                            </div>
                        );
                        break;
                    case 'link':
                        ans = ans.concat(
                            <div key={index} className='att-link'>
                                <p> Оглавление: <span>{item.link.title}</span></p>
                                <p> URL:
                                    <a
                                        className='att-anchor'
                                        href={item.link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                    <span>
                                        {item.link.url.length > 30 ? item.link.url.slice(0, 28).concat("...") : item.link.url}
                                    </span>
                                </a></p>
                            </div>
                        );
                        break;
                    case 'video':
                        ans = ans.concat(
                            <div key={index} className='video-div'>
                                <a
                                    href={`http://vk.com/video${item.video.owner_id}_${item.video.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <div
                                        className='att-video no-repeat-contain-img'
                                        style={{
                                            backgroundImage: `url(${item.video['photo_800'] || item.video['photo_640'] || item.video['photo_320']})`
                                        }}
                                    />
                                </a>
                                <span>{item.video.title}</span>
                            </div>
                        );
                        break;
                    case 'doc':
                        ans = ans.concat(
                            <div key={index}>
                                <p>Название: <span>{item.doc.title}</span></p>
                                <a
                                    href={item.doc.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span>
                                        {item.doc.url.length > 30 ? item.doc.url.slice(0, 28).concat("...") : item.doc.url}
                                    </span>
                                </a>
                            </div>);
                        break;
                    case 'poll':
                        ans = ans.concat(
                            <div key={index} className='att-poll'>
                                <p><span>Тема опроса:</span> {item.poll.question}</p>
                                <div className='answers'>
                                    {item.poll.answers.map((ans, ind) => (
                                        <div key={ind}>
                                            <br/>
                                            <p><span className='custom-poll'>Вариант:</span> {ans.text}</p>
                                            <p><span className='custom-poll'>Количество ответов:</span> {ans.votes} ({ans.rate}%)</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                        break;
                    case 'audio':
                        ans = ans.concat(
                            <div className='att-audio' key={index}>
                                <p>Группа: <span>{item.audio.artist}</span></p>
                                <p>Трек: <span>{item.audio.title}</span></p>
                            </div>
                        );
                        break;
                    default:
                        ans = ans.concat(<p key={index}>smth</p>);
                        break;
                }
            });
            return ans;
        }
    };

    //renders current Entry
    renderRow = (entry) => {
        //Renders first image onto left side of text field
        const renderImg = (entry) => {
            const { openModal } = this.props;
            if (entry.attachments
                && entry.attachments.find(a => a.type === 'photo')
            ) {
                const style = {
                    backgroundImage: `url(${
                        entry.attachments.find(a => a.type === 'photo').photo.sizes[3].url
                    })`,
                };
                return (
                    <div className='leftside-img'>
                        <div
                            style={style}
                            className='no-repeat-contain-img'
                            onClick={() => openModal(entry.attachments.find(a => a.type === 'photo').photo.sizes[3].url)}
                        />
                    </div>
                );
            }
        };

        //converts text links into anchors
        const convertAnchors = (text) => {
            let ans = []; //answer - returning value
            const words = text.split(" ");

            const doAnchor = (word, indexWord) => {
                let ref = '';
                //remove empty symbols
                while(word.startsWith('\n')) {
                    ans = ans.concat('\n');
                    word = word.slice(1, word.length);
                }

                //if word have empty symbols - split it into link+word
                if (word.indexOf('\n') !== -1){
                    ref = word.slice(0, word.indexOf('\n'));
                }else{
                    ref = word;
                }

                //reduce link's length
                if (word.length > 22) {
                    ans = ans.concat(
                        <a
                            key={-indexWord}
                            href={ref}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {word.slice(0, 20)+"..."}
                        </a>
                    );
                } else {
                    ans = ans.concat(
                        <a
                            key={-indexWord}
                            href={ref}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {ref}
                        </a>
                    );
                }

                if (word.indexOf('\n') !== -1){
                    //if second part(after empty symbols) of word is link - process it independently as a link
                    if (word.slice(word.indexOf('\n'), word.length).indexOf('http://') !== -1
                        || word.slice(word.indexOf('\n'), word.length).indexOf('https://') !== -1){
                        doAnchor(word.slice(word.indexOf('\n')), word.length);
                    }else {
                        ans = ans.concat(word.slice(word.indexOf('\n'), word.length));
                    }
                }
            };

            //for each word in text
            words.forEach((word, indexWord) => {
                let index = word.indexOf('http://');
                if (index === -1) {
                    index = word.indexOf('https://');
                }
               if (index !== -1) {
                   if (index > 0) { //if link isn't at start of word
                       ans = ans.concat(word.slice(0, index)+" ");
                       doAnchor(word.slice(index, word.length), indexWord);
                   } else { //if link is at start of word
                       doAnchor(word, indexWord);
                   }
               } else {
                   ans = ans.concat(word+" "); //if word isn't link
               }
            });
            return ans;
        };

        //Renders text of Entry
        const renderText = (entry) => {
            if (entry.text){
                if (!(entry.attachments && entry.attachments.find(a => a.type === 'photo'))) { //if there is no leftside-image
                    return (
                        <div className='margined-text'>
                            <p key={entry.date}>
                                {convertAnchors(entry.text)}
                            </p>
                        </div>
                    );
                }
                return (
                    <p className='entry-text'>
                        {convertAnchors(entry.text)}
                    </p>
                );
            }
            return (
                <div className='entry-text'><p>Текст отсутствует</p></div>
            );
        };

        //text for 'show-attachments' button
        const btnText = () => this.state.isShowingAttachments ? 'спрятать вложения' : 'показать вложения...';

        //Renders copied\quoted post as a new Entry into current Entry
        const renderCopyHistory = (copyHistory) => {
            if (copyHistory) {
                const { openModal } = this.props;
                return (
                    <Entry
                        openModal={openModal}
                        entry={copyHistory[0]}
                    />
                );
            }
        };

        const renderLikesReposts = (entry) => {
            if (entry.likes && entry.reposts) {
                return (
                    <div className='flex-row likes-reposts'>
                        <div className='flex-row'>
                            <p className='count'>{entry.likes.count}</p>
                            <div className='like-img'/>
                        </div>
                        <div className='flex-row'>
                            <p className='count'>{entry.reposts.count}</p>
                            <div className='repost-img no-repeat-contain-img'/>
                        </div>
                    </div>
                );
            }
        };

        return ( //render text, likes, reposts and attachments
            <div key={entry.date} className='entry'>
                <div className='entry-head'>
                    {renderImg(entry)}
                    {renderText(entry)}
                </div>
                <div className='entry-footer'>
                    {renderLikesReposts(entry)}
                    <button className='att-btn' onClick={this.toggleAttachments}>{btnText()}</button>
                </div>
                <div className='attachments'>
                    {this.renderAttachments(entry.attachments)}
                    {renderCopyHistory(entry.copy_history)}
                </div>
            </div>
        );
    };

    render() {
        return this.renderRow(this.props.entry);
    }
}

Entry.propTypes = {
    entry: PropTypes.object.isRequired
};
