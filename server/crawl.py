from bs4 import BeautifulSoup
import urllib.request
import collections
collections.Callable = collections.abc.Callable

class Job:
        def __init__(self, name, jobType, place, age, money,time, howMany, howToApply, url ):
                self.name = name
                self.jobType = jobType
                self.place = place
                self.age = age
                self.money = money
                self.time = time
                self.howMany = howMany
                self.howToApply = howToApply
                self.url = url
        def print(self):
                print("직종 :", self.jobType,"위치 :",self.place,"급여 :",self.money,"인원 :",self.howMany,"url : ", self.url)
        def getJobInfo(self):
                infoStr = "업체명 :"+self.name+", 직종 :"+ self.jobType+", 위치 :"+self.place+", 연령 :"+self.age+", 급여 :"+self.money+", 인원 :"+self.howMany+", 지원방법 :"+self.howToApply+", url : "+self.url
                return infoStr
        
def crawl():

        root_url = "https://goldenjob.or.kr/job"

        url = "https://goldenjob.or.kr/job/find-person.asp"
        res = urllib.request.urlopen(url)

        soup = BeautifulSoup(res, 'html.parser')

        table = soup.find_all('tr')
        a_tag = soup.find_all('a')

        total = (int)(len(table)/6)

        #if link is not None:
                #print(root_url + link.attrs['href'][1:])
                
        job_arr = []


        for trs in table:
                td_list = trs.find_all('td')
                
                if len(td_list) != 0:
                        registered_date = td_list[0].find(text=True, recursive=False).strip()

                # 두 번째 셀에서 구인상태 추출
                        hiring_status = td_list[1].find('span', {'class': 'state-ing'}).text.strip()

                # 세 번째 셀에서 업체명 추출
                        company_name = td_list[2].find('a').text.strip()

                        detail_url = td_list[2].find('a').attrs['href'][1:]
                        detail_url = root_url + detail_url

                # 네 번째 셀에서 직종 추출
                        job_title = td_list[3].find(text=True, recursive=False).strip()

                # 다섯 번째 셀에서 근무지역 추출
                        work_location = td_list[4].find(text=True, recursive=False).strip()

                # 여섯 번째 셀에서 연령 추출
                        age = td_list[5].find(text=True, recursive=False).strip()
                        #print('등록일:', registered_date)
                        #print('구인상태:', hiring_status)
                        # print('업체명:', company_name)
                        # #print('Url', detail_url)
                        # print('직종:', job_title)
                        # print('근무지역:', work_location)
                        # print('연령:', age)
                        
                        job_money = ""
                        job_time = ""
                        job_howMany =""
                        job_howToApply = ""

                        detail_res = urllib.request.urlopen(detail_url)
                        detail_soup = BeautifulSoup(detail_res,'html.parser')

                        detail_table = detail_soup.find_all('table')
                        for tr in detail_table:
                                td = tr.find_all('td')
                                if len(td) >10 and td[10].find(text=True, recursive=False) is not None:
                                #td = td.find(text=True, recursive=False).strip()
                                        # print(td[6].get_text(strip=True))
                                        # print(td[7].get_text(strip=True))
                                        # print(td[8].get_text(strip=True))
                                        # #print(td[9].get_text(strip=True))
                                        # print(td[10].get_text(strip=True))
                                        job_money = td[6].find(text=True, recursive=False).strip()
                                        job_time = td[7].find(text=True, recursive=False).strip()
                                        job_howMany =td[8].find(text=True, recursive=False).strip()
                                        job_howToApply = td[10].find(text=True, recursive=False).strip()


                        #print("\n")
                        job_token = Job(company_name, job_title, work_location, age, job_money, job_time,job_howMany, job_howToApply,detail_url)
                        job_arr.append(job_token)
                        


        for job in job_arr:
                job.print()
        
        return job_arr

crawl()