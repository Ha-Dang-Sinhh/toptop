import React, { useEffect, useRef, useState } from "react";
import { FaComment, FaHeart, FaMusic, FaShare } from "react-icons/fa";
import { useElementOnScreen } from "../App";
const VideoInfo = ({ avatar, idName, nickName, music, content }) => {
  return (
    <div className="flex flex-row">
      {/* <img className="w-[50px] h-[50px] rounded-full" src={avatar} alt="avt" />
      <div className="ml-3 min-w-[80%]">
        <div>
          <a href="#" className="text-xl font-bold hover:underline">
            {idName}
          </a>
          <a href="#" className="text-xl">
            {nickName}
          </a>
        </div>
        <div>{content}</div>
        <div className="flex flex-row items-center">
          <FaMusic /> <span className="ml-3">{music}</span>
        </div>
      </div> */}
    </div>
  );
};
const VideoContent = ({ urlVideo ,video, like, cmt, share }) => {
  const videoRef = useRef();
  const [playing, setPlaying] = useState(false);
  const [colorText,setColorText] = useState("text-white")
  const handleVideo = (e,element) => {
    e.stopPropagation();
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3,
  };
  const isVisibile = useElementOnScreen(options, videoRef);

  useEffect(() => {
    if (isVisibile) {
      if (!playing) {
        videoRef.current.play();
        setPlaying(true);
      }
    } else {
      if (playing) {
        videoRef.current.pause();
        setPlaying(false);
      }
    }
    
  }, [isVisibile]);

  useEffect(() => {
    // handleVideo();
  },[])

  return (
    <div className="w-[100vw] h-[100vh] flex bg-black relative event">
        <video autoplay
          ref={videoRef}
          onClick={handleVideo}
          className="h-auto cursor-pointer rounded-md mx-auto my-auto"
          src={urlVideo}
          loop
        />
        {playing===true ? null : <p className="w-auto h-auto absolute text-4xl text-white z-[10000] top-[45%] left-[47%]" onClick={handleVideo}><i class="fa-solid fa-play"></i></p>}
      <div className="flex flex-col right-4 top-1/3 absolute">
        <div className="text-center mb-4">
          <div className="w-[40px] h-[40px] rounded-ful cursor-pointer flex z-[-100] items-center justify-center">
            <img className="w-10 h-10 border-2 border-white rounded-full object-cover z-[100]" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFRgVFRUYGBgYGBkYGRwcGhgYGhgaGRwaGhgaGhwcIS4lHB4rHxgaJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHxISHjQhISE0NDQ0NDQ0NDQ0NDQ2NDQ0NDQ0NDQ0MTQ0NDQ0NDE0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0P//AABEIAMIBAwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAFAAIDBAYBB//EAEIQAAEDAgMFBQYCCAUEAwAAAAEAAhEDIQQSMQVBUWFxBiKBkaETMrHB0fBCUiNicoKywuHxFDM0kqIHJFOzFWNz/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAEDAgQF/8QAKxEAAgICAQMDBAAHAAAAAAAAAAECEQMhMRJBURMiYQQFMnEzNEKBkaGx/9oADAMBAAIRAxEAPwD00FOlRgpwK5zZICugqOUgUWBLKQKjlIFMB7nffD7+a6CoiV2UASSlKjlJAD5SlMlKUAPlRV6zWNL3GGtBJPABPlYPtztol3+HYbC7zxO5vhqhKwBG2ttOxD3Xhu4cB/ZUmVQPBUM8fepXM0iN6olQckW0sSXiBodOg/qmbOwkd7Uolh8EHQi+GwIA0ScjSxmYyEOTq7tPv7tKJbTwuUyEIqnX70WlK0YlHpZPhq5a7M0xf1W32HtD2rRBh7fdv/x/ZO7h4Lz1j7kcfoiOzMcab2vG7Xnx+azJWaiz2DA4kPbO/QjgRqFK8IPs7EjMx7T3KgAP7REtPiJHUI2VFmiu4JpClcmFIBU1KFE1PBQA5JclKUCOriSRQBxJJJAWPC6E1dC0IfKUpiZVqholxgICiaV2VWo4lj/ddMKYIBqh8pSmSlKLEPlczLiagB8rspoSlAFPbOPFCi+ofwttzcbNHmvHq+IJJc4y4kkk7ybrbf8AUTHe5RB/Xd8G/wA3ovPqjpPiqxQN0PL4t4lW8KwkoZTlzoG8+QFh8JWjwOHgBOWhwVl/B00Qa2yjwrLKyQotnQgJtQWWbxJ9CtVtJkrK1hqOvoqQ4JZEVmuupWvv5eaqynArbRFOjddkdpSx9Fx3ZmToHNuB53XodF+ZodxAPmJXiGzcUWPa4G4IXsGxKxdTGkRIOYGQ64+KlKJS7Rfcoyk+rHPpdIOlTaYzgTwmFOCAHJLhK6gQkkl1ADUl1JMQ4LqgGInLGTvad8nNGsWuuUnjvFpZ7xDtTDtCDfVb6GZ6iwhe3T3J5/JEJd+YeDfqVQ2yw+zMknTcBx4BNwaVm4S9yA+wa5FVo3OBHpI+C1YWGw9XK5rvykHyK3IKmVzLdiSSSTIjk1PTSkBxcqPDQSV1Y7tnt5rAaTXd7fGtx9PQ87NK2Bku020fa1nvmRMN6NAFuX1WfqPO7U/NdxOKBOsngPmo6YOp1XQlSMN2y7gcJJ96D11R7Bse2xMjmg1LAvLXZZzWiDAi2vNE9lMrAltQcC0yD1BjwU5FoLtRocI+yZi8ZlsBJU1Kl3ELqvguc4wACSTuA5qXctRVxOKrO0YI63QLFOIPeEHUoltHar2Bpa0Q8Etvcga7jxHmhTsZn94QS0OHQ3VY2iMqerKLzf7+/wCyTHblyuYKjnfwVCNbLlI3leldhcfmYWTdhjwddp85HiF5bTf5o3sTaLqTw9p5OG4g7j4gHwWSkdo9mddRb1U2PtRldkt13j73K65ZmtCXJxOampzVE0OXVwLqYhLq4nQigGpLqSAGNpWA7sDTu6dL2T/Zn8x8m/RPC7C6yRH7PmfOPgqW1aXc38Llx3E7zyRIBVseyWH75fNKXBqL2jGubqthgKmdjHcWieuh9VkqggmUf7PVZplv5XEeBuPUlch05VasMJLkqOvVDWlxTIIjxWNYzXXgn4esHtDhoflZZDaOLL3ytXs+kWU2NOoaJ6m59SgrOCjFeR+IqZWkncvHu0j8z3H8TiSTzdc+QML1Xa9SGxyJ8hqvH9t1w6q/Ke60x8ifQrcOSb4BbaY8z6IlgqOd7W8/TW/3vVSkbTvJsj/ZSmHFzzfQDw+/RUlKkKEblQZpYEBXKeGA0CmcQFLhu8dLSuezrqiX2UM8ENGHBJRvFRlgIZSMOgoElZSr4KRcA9Qg+M2aLmB4Ba94EITjm2KfUPos8/2wzKJ5whrKqL9pNw8fkPUrPBXjtHHk1IvNcruDfeCYQlr4Vuk4hNoUZUb/AGLUcGZ6ZDalO7m7ntizxv5Ebwt9g8U2qxr279RwIs4eBXlnZzFltRjpu0iebTZ0+njC3+wwWVK1Me5OZnRwn5FZa1RV+Q4EgutXCoCJAuwkE5NCGrqRXUwOJJQkgDrVI1RNXKlUNXS3XJOrLEKPEDunpPldUn7UaNRCadpscCOIN+HMrHqR8m+iXgzuLpw4jgSrGwK+WqWbnt9W3HpKr7Qq5qjiNCVHgy5lRj4kNN41g2PoVztHTVx2bGUG2ripsNFcx+KAbAPvCfBZzE1CgxCPcl2ZhPa1QCO63vO5gaDxPpK1qHbAw2SnmIu/vHp+H0v+8iiZjJLqZmO12JLKT3j3spY3q/KPp9leSY58OLB+EQ48T+L5r07/AKhPOSmxvvPqW/dj5kLyyswBocfxAvO8wXOA/h9VWC0TlwPbYBFezGJLSRuJ/p8vVBaz9BzH36K5smrlfGk3H09J8FqStDg6kjdCrJA4q64OaAWmI1HFBKtD2jJBc0xILSQQfBOwGIDw2m6vlqiGw+weZiWu0J3xulQo7FvYUq4l5sFxgcbuURwuIbMhsAx72s+CHY7aj2d2GvedGNMuOusDui2pslQ38NB0VbIdj6lin4POWy9oaYuAZA8VQ2tiWsa5zjAaCULkTlSMT2hrd6JuTHg3XzJHkg+cHUKTHVC57idxjofxD/cSoGi66YqkcE3bskCvYC/cJsfdPAqoxllYwzCO9pceunwTEuQ/spjhUZFnF4YfHRw5SAV6fsV+Zxfxa300+JC852VVl7Hbw4eBlb/YTHZZkAFzm6Hd3hv5rDlXJetGjYulcpsgaynKAD2JyYxPTEcKQXCkCgQ5JNSTA450CShONxcSZVnatUtaI3rOYuoXeK1kk7o3ij3K+KxJJncm+1dpMD6KF9EkZj7s2O62qa1/91M6Sw16sYeqQbKq0qxTQZLVSqdSocNR9pUYzc43/ZF3eg9U2o9XezJBquJ1DLeLhPwCBSdRtGqaF0rkpOeAJJgcdyZymB7dVc1bI3VlNoHJ9Z+o5hlKofELzzbBAe9o0YQwdKbQz1LT5rX7U2kxzqtaRme4PYJ0DcraMHQZmsnkKjzuvice+XOMgkucSRoS4zad11aKEysXy2fu32VJQfLZ3g2+SgY7duSwtiWlbA3XZ7Hl7PdmDDtLEaq5jsEHzLJB5XCyHZ/aH+GfnddjnBrxwbueBvg+gXp1IMe0EEEESDqCDoVCSpnVhyOOzK//AB1suV0awCQ2eOXSUQ2ds4M3Ach96o2aDQqONxTWCywWlktUlRFj8U1giY4rz3au1zXqwP8ALpy8/rZLjwLsrRzci+2sQ5zXXt8Vk6rPZ08p9+pDnfq0xdg6ucM3RjOKrjiuTkyyfBWYCdbpNFwpWiB1XA24VTnJ9B4qZ5hviPSfqq73XjgrGXMEAgxsmtYOB19P6heq7DvRafzHN5uMrxfZVWDC9S7HbQkezO4S0ct/l8+qlNF48GzKaSuZ96Y9ykFDH4trTB4K010oLjhcc+756esKzsiu5zBnEOFiOHLmkmNx1YSKbK4XJuZbM0SSkuwkqdDM9QN2hULmjuBvDvST6WWcrOGnCZWwfTa4QQCOBuhm19mNczMwBpaDYCAR0Ck23yWxyS0BsDiA9nsT7zQ5zBAhwmXQYmRwJ0VWoy67gtmOrVGsDywiSXCzgIItzMx4lSP95zHe+ww4fB0cDqm1pM3dSaI2NVqgxR0GSVfaxIcivjKfdsu9mHfpyOLHfFqtvp5rJ2zMK2nUz8i09DF/RBmX40GsRXLYaxjnvdoBYCNS5xs1vrwBQTa+EfiAGVXsYwEueymS5xgGAXndv93hdHxigZv0HwQ6k/u31N3czzV4QjzdnLJtfB5ztrYD2OPs2gssO9ILZFjbUfS6HO7NED3iXQTAjdHEXK9KxtLM1w4j4EIfRwoJHQqvShJnlz9najTquYnZ7mZcwIJuOMLeM2OM5c4SM0hvzPOdyg29gQ57WN94tuYuGSIvxPwlJx0NPZi8dhctBj+J+Jt/D6rU7ExT2sABtw1CZt/Bj/DkAe73ee7L81HsphDQDwUMheAcfi3kKhXBdcmVYAUdSyjZYEYjDB5aw6OcATwb+I+DZPgs12owxZiXyIzEOA4CIAHIAQOQXouwtnB5qPePdDWM/aqS09e7I/eWR7fM/wC5tuaJ/wBzoXTBe2zmyyt0ZwsuAlmkk8ICTH2JXMOLkcloicY65VzCusqjQpsO+D9+CTHHksU6BBL2i1yY3DU+S1mxcWGlj2ky0gO4xxEcj6c1mcDULTM2M9DuII3jvKbA4iLc3DXhprfQwsvZZaPasNWkC993P+qmcVndgY72lFrgZIADxwI3j4/dzDKx4yOO/wAlGjVEeMbIN458Od1V2DiXlsPjPJmIF54DkY/dVuq6QhdCpkquHGHfUepWW6aNprpaNI1ycy5VJldSZydHFvMRPqCqKrJNBHMks7Xdi8xy1nRullI/yJK3XEn0M0AXCkmvfC5jYE27jv8ACU31KbMzssNaBbO7ugvO5omT05rytuJqseazXl1Un9IXTFQnvGfO0aaL1nHkOBabg6rz7bWwXNdmp95szlkgj6hUhJcMUk+UT7O7TUnmHHI/e11r8joVosPtFrhZw8xdebVsO7R7Lg7wWkD4ytP2c7PvriXu/REQ4uEubJMhpcJLiAIvADpO4Hbh4Gsr7mrZiNyssqmJIPkYVvIxjG06bQxrWgNaLBrRaPVMbiC3eSE/R+Q9Z+CAVea4/EQFYLWulxaPvmEPdSadRPiUvSknaZr1YvTRdpOziRvHxCQw0BR0XkfTorFDGA2cCD5hdCrucz+BrMHmIkaXPPkqb9njMXEAnU2+HqubY2w9gy0m5f13CSeg0Hiu9nqr6jHF7i52ffA7sNIFhxlMdNKytjtnh4jc4EHkYgE8rnzWew+HLSQRBFj1C3NehZA9sYTI5r/zd13UDunxA/4qGaOrRXFLdA0NTH0idyvU6QU2QaAXNh1XKdFhHZeFyUWAiCZqO8RDf+IHmvNO1dNzqlR8SJieECPjK9VxUU6cTugdAvNu0NqT/wBZx8s0rtUajRxt27MW9mVs8weoIS91wO4/NSvPdA6jyNlXre70KyIle3KeuiVE3jj8k4nM3mPgoQ6EDQQwz3tOZoJGliW9RZR06nek2uSeN/irlN4DAR70GI4myH0BJykgtDrxvnTwsFk1ZtuxWOyvyE2dbxJtPp6rd1gZtIm0jobxuiPVeW7JYM4g5cx1vDSbNJ5AwvQtm4tz2lrwWvYQHAHX8rgeB1nepyjWyylaouB8jS9weosfqgm0KmR4i5AcTfSYgdTfzRfEvyiRqdPr9OhWexAmYgkGTPEcfJSkrRqPIawGMLrHgCOYKK03rLYWt3WOH4e6fAx8keoVZCIu0DQQzJKvmSWhUF3PhU8RUXatVUqz0jKiQ1nobiCrdVyoV3ISNjKVPM4NmJ1J0A3laVlIMYGsAyjheeZ5rObPrQXWnceX9FeZXcw9093h9F1Y40rITdugi90jwhUvakcxvUwr5goXMVTCRPSdu5JNChw473QFTsF0REx1NveCtNoiZULB3leaxMRQ2xhQ5kxcIVhM9OSwxa9pB8Fpq7JaqFOggaegdiO0jGMBqsc3vBpc3vCTvI1AtulXcRUpYmiSx7XSMzYN5bcWNxoRcb0K2tgAaLwRoQ7yMn0lQbHYG06ZAu18+TnH5Kbk2+l+DqeKKwrIuU6G0H2VvDkiXgTl92dC7dPITPko34U+2cxgJuCDuhwBn1T9o1Mo9k06AZiN5N3ffRQhD3W+EZcrVLuV6O2PbA03ke0a0xuztbqY46T9xntvgMpvzXsQP2nWHklUo56hqiwpmARxH0ufJZfaeMfWIe8nK4mB+FttBxOknjKupWjObEoNJPtv4BlZ4mBuH9T8VHE25p72EmwtxOifkAk+ZNvLeskSOeG5Q1JmeBUgHeyxvk81IWTPNAFnZtP2j2sLoB9f1R1+SKbU2YWBz2NMQA8cBoD8lnWOc0gtsWmel9VpmbXdWpPZklzmQ45o4GQ2LnXzRoaG4SsIA/FLcu+YP1A8l6Zs6nSxLQ+k8MqhukG06teyYcw30PGCF5hs7ZNR9I1Wd6SRl0cHDQg7ncv7IvsXb5YYqtIymM4s5pPH8hPA2MeCX7NI12Oe9jyysMr4kb2vG8sO82uNR0goVh8OWzLgZLj4uH91q8PUZjaOR5DtMjwN/wCHMPwu5aHdfTOVcG+m/I8WDoknQ7gfzA7ncwo5Y9KdFYS6huGw8MABMOEnT3tD0GiuYKvAg7rKIUixtyCAbRNp6hNeQ14Omb7PxUolJIL+1SVL2oSWhBl71UqPUlR6rPcsgRVHKhiXq1UcqrKed4bwufkFWCtiekTYRhAnordNskjh/wAT9CrdPDgCIUNSmWuzDXQ811pUjnu2cpthTkLrYcJHinNCdA2R4Nt3eXxU7W3TcKyM/wC18lPHeTRliYO94og1Dc15RBrk2IkIVZjYKtNUD7GUgRUxNIHM06OB9RBWfwQLWMadQXz4OI+ZWnrgHXqFlmVJrObwLv4iZ9FN6kjpi28TXbTLteu9r2ZTA9m4usLlhLGGdd7LclSebR+J033gb3fe9X8RBY93/jYR1nI8/wAB8kN2awvOZ34vQDQIlLaigxw9jm+Fr9sTMMAwNa2wFgvN9r1DT/RCC1j3lhbvBdMHjBMefBemdodo08PTc0QXuaYaNw3vdyE+Jgb15JUlxIaDYXJuRGpJTZJyctsrVK5PLon4cXk6G3Tgo6LLqd+h4adVkwPPqLdUxjyHCONl1j5gE33FMrFIBz6cXNhN44E3CJYB3sX06n4HG/Q6jnxCH5swk6WHxP1Vo1HU2FhEtdBB/KRGnX5oGkbDC1P8K90g+xqHMDvY76HpwVbauNYajXMbBIIdMZXtI0Im/JDcFjn1WtptaXugCD7oiYLvzDl8UcwfZSs1oe2oGVBcdwOHG40id0IZpG17IYEU6UOF3gZhaIHuiPE+atbZw4eCTfK2JOrmXkOO8i9945hCdhY3EtOSu1k6B7JAd1B0PotNRZMg6n04G/3ZEoKUaYKTjK0ZBtQPZlHeMEcZItNtJ+age2WSNRB03WlFNrURhnBxBLKhlkXh0XpxxkSOp4FCsNLXGm7WL8O8JtyBkeC4lFxk0zqvqVoj/wAQkh1asA4gk2JGnAwuKtCo1r3KB7lRO1WHR49VBU2kzdLvQeZWEgbLdR24LuHfkcHa8ecoLiNrEfiawdZKg2dtRjq9Npe52Z7WjUiXd34lUindmJSVHoTCCARoUypTlZ3F7fbhsSKdSfZvAOb8h0nod/nxWla8OEggg3BFwRxXZCSkjnaorFkGR/dPa4FSFqhqti6bQFjDmRPNOcL+aZgzLT1+ina2ShGWDsZLX8iJHLciOGrZgOi7VwrXiD4HeFUw2EqsMESNxBGnQ3TAKtNlxwm3FRscd4hOLkAVsRYfBZF9fLiDuzPe31JC2WIuY4hYTaP+c4f/AGOHqY9YXPldNP5PS+ih6kMkfj/ga9rmrCjYh2U87taxwn9h1TzUOKreyPsKUZwJc58hlNoMF7yL7jDd8FUtgvz4prjf3j4ZS0fEJ3a2o5lRzWRmrtp5ePtCXU9N4aRnPTmjG+q2/Jn6yHpdONeE3+zHbdxOfOWOcWhwaXPMPqVCNT+UAHTRogbygtQiMjBIHvO/Md56cAie1gz2raLPcpDKTNyfxmfzOdaeU8lHhWZ6jWAQ0XjkNy2cQNfhnNAtYnKTwtIHimVmiRwFvvnZG8eP0VUj/wAro/cDb/fFAW1Isbj7v1SYiIC8/dlMaRc0vm+pHImFLTaMwG6RPGEWx7KTWgs1cBIEa7ojRAICUm3y8crvH7K1zcG00TP5Xa3sQY6WQDC4eauWIcYMHwHzWkx9TLh35obIDBwk93hznwTRoKdgGf8Abh0aud6E3+K2bGgrOdj6OTDsBESM0cJMx6rT0wtJaMMfSpAaK0xRtapSNyYFl+HbVp5HixuOLTMtcOYXnnaCm+g7MQCWHK4i0iJa68236716JReoNq4FlZhD2B4i4Osa2IuOKhkx9TVcl8GVRl7la7nlWJqio4v9m4Zr+6Ult27Bpj3ar2jcIaY8V1T9OZ3+p9L4/wBnlAx1R3ujyBJ9FMzZ2JqaMfHE91bung8ogGmz9lpJ9QFKMK06veekN+qm8sUcPTJmKpdl6hu97GeOYojhNgUmOa8vc5zHNeIAAlpDh6haZuFYPwg9S4/AgJ0AaBo6AfGJWXnXYaxvyDNq0WVSHljXOAiTuFzIHOy7hq76IAae7rlOnOOCnxRe4xO7f6pmIpSGXOhmN+mvqqRm5K1ozKNaNFS7zQ6bESNNFSxWIa2xdJ3Aa+KFt2i9jGsFtb77nQTpdNayfHXnOvj9VeWXWiaiH9j1s4faILfWforZ1hDOz7Yzjk34u+qKu1VMMnKNv5FNJOkWaTbKdqYwWUgVDBTrvvC4XXHL5/ZTqtO5KpvfB++aYFh3vDovO9sPIqvPB2bzAct89/dJ4A/BYbb7O+f1mg+Nx8guX6he1P5PV+zyXruL7pk/Zao1uIbmMZmuY39ojMPRh8wq3bvaQDw9hl+HeWAiDl9swgHq11N/+8cVc2Nsc1aYqA5XDMWHgQ0BpHMOzeSyu1XS5jItVwkRNg9v6VpMb/aMj94p4lUES+4TUvqHXbQHwwAY57zeCQOLt08pKIbKcGNLiWtJBJuCb8AOiH0cI5z6dF5c17niRwpgZpHW/iCtecFTYxz3QxoHvGLDlO/gqUcRm8e7LTDTYvc4xva0nM7+VvggBKM4upmdmIgv0G9jAO6DzJueqHuplkAiJEtnhN+qTBkbSS4EcvTf8FocFTdVLqpFmwBwn+mvVyzwMG60vZfF5mvpb2nM3oTcefxQCG4toZiRViA3IHfvSCfC3kr7QcTUDS2Kbe+J1cSTlngLExyC7jMMHuePzs/hJnyzNUnZsyzMTLs3e6gNA/4hqO4M22AbAhEqZQvAvBhFWKhgtU1MFXY5StcgCVroVhj1UL09l9UqAr1aMkw1JXsySB2ea7Jquc0ZiT1JKIFJJeLL8mdsScqJ2qSSSNEP4vD6p2J0b4pJLqxfiRyclJ/vDq74lXGpJKrMLgKbC99/7PzCLP1CSS6cH4f5JZeS2zRPC6krGSN6E4v3kkkAR1Pdd+yVmdu/g6u/lSSUc/4M7ftn80v7mh7Nf6el/wDn/M9eZ47/ADsL+7/7HJJJ/wBKI5/4kv2yr2iqEYthBIOU6EjipcU8ur0muJLZJg3EybwUkkEintD/AFI6H4uRXtOwexpWGv8AIEkkhmWq+63oP4noj2W/1LejvgVxJAGuxmv7j/g1Cezfv9Tfn3UkkdwZt8Bu6hHqSSSojDJwntSSTAe1TtXEkgJEkkkgP//Z" alt="avt" />
          </div>
          <p className="w-[20px] h-[20px] text-white text-xl flex justify-center -mt-4 ml-3 z-[10000000] rounded-full bg-red-500">+</p>
        </div>
        <div className="text-center mb-4">
          <div className="w-[40px] h-[40px] rounded-ful cursor-pointer flex items-center justify-center" onClick={() =>{setColorText("text-red-400")}}>
            <FaHeart className={"text-4xl "+ colorText} />
          </div>
          <span className="text-lg text-white" >{like}1960</span>
        </div>
        <div className="text-center mb-4">
          <div className="w-[40px] h-[40px] rounded-ful cursor-pointer flex items-center justify-center">
            <FaComment className="text-4xl text-white text-center" />
          </div>
          <span className="text-lg text-white">{cmt}123</span>
        </div>
        <div className="text-center">
          <div className="w-[40px] h-[40px] rounded-ful cursor-pointer flex items-center justify-center">
            <FaShare className="text-4xl text-white text-center" />
          </div>
          <span className="text-lg text-white">{share}12</span>
        </div>
      </div>
      <div className="text-white absolute bottom-20 w-[60%] pl-2">
        <div>
          <a href="#" className="text-lg font-bold hover:underline">
            @Hà Đăng Sinh
          </a>
        </div>
        <div className="">
          chết tịt cái thằng chết tịt này mày đang làm cái quái quỷ gì vậy
        </div>
        <div className="flex flex-row items-center">
          <FaMusic className="text-4xl" /> <span className="ml-3">nhạc nền - ngồi bên em - ALBUM NHẠC XUÂN</span>
        </div>
      </div>
    </div>
  );
};
const Video = ({ data }) => {
  console.log(data);
  return (
    <div className="snap-start max-w-[600px] mx-auto border-b-2 border-gray-200 relative">
      <VideoInfo {...data} />
      <VideoContent {...data} />
      <div className="w-full h-16 bottom-0 fixed z-[10000] grid grid-cols-5 gap-4">
        <div className="text-2xl my-auto text-white flex flex-col mx-auto justify-center">
          <i class="fa-solid fa-house mx-auto"></i>
          <p className="text-xs">Trang chủ</p>
        </div>
        <div className="text-2xl my-auto text-white flex flex-col mx-auto justify-center">
          <i class="fa-solid fa-user-group mx-auto"></i>
          <p className="text-xs">Bạn bè</p>
        </div>
        <div className="text-2xl my-auto text-black flex justify-center mx-auto bg-white w-14 py-2 rounded-lg relative ">
          <i class="fa-solid fa-plus mx-auto"></i>
        </div>
        <div className="text-2xl my-auto text-white flex flex-col mx-auto justify-center">
          <i class="fa-solid fa-message mx-auto"></i>
          <p className="text-xs">Hộp thư</p>
        </div>
        <div className="text-2xl my-auto text-white flex flex-col mx-auto justify-center">
          <i class="fa-solid fa-user mx-auto"></i>
          <p className="text-xs">Hồ sơ</p>
        </div>
      </div>
    </div>
  );
};

export default Video;
